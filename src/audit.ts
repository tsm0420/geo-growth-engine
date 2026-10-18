import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { load } from 'cheerio';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { EntityDecoder } from '@nodable/entities';
import robotsParser from 'robots-parser';
import type { Config } from './config.ts';
import { report } from './report.ts';
import type { Finding, Report } from './report.ts';
import { rejectSymlinkAncestors } from './paths.ts';

async function optionalFile(path: string): Promise<string | null> {
  try { return await readFile(path, 'utf8'); }
  catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return null;
    throw error;
  }
}

async function htmlFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Public export contains a symlink; provide a self-contained export: ${path}`);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (entry.isFile() && /\.html?$/i.test(entry.name)) files.push(path);
  }
  return files.sort();
}

function xmlLocations(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap((item: unknown) => xmlLocations(item));
  if (typeof value !== 'object' || value === null) return [];
  return Object.entries(value).flatMap(([key, child]: [string, unknown]) => key === 'loc' && typeof child === 'string' ? [child.trim()] : xmlLocations(child));
}

function summarizeSitemap(locations: string[]) {
  const byUrl = new Map<string, number[]>();
  for (const [index, url] of locations.entries()) {
    const positions = byUrl.get(url);
    if (positions) positions.push(index + 1);
    else byUrl.set(url, [index + 1]);
  }
  const duplicates = [...byUrl].filter(([, positions]) => positions.length > 1)
    .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)
    .map(([url, positions]) => ({ url, occurrences: positions.length, positions }));
  return { entries: locations.length, uniqueUrls: byUrl.size, duplicateEntries: locations.length - byUrl.size, duplicates };
}

function xmlCharacter(point: number): boolean {
  return point === 0x9 || point === 0xA || point === 0xD || point >= 0x20 && point <= 0xD7FF || point >= 0xE000 && point <= 0xFFFD || point >= 0x10000 && point <= 0x10FFFF;
}

function numericReferencePoint(reference: string): number {
  const hexadecimal = reference.startsWith('&#x');
  return Number.parseInt(reference.slice(hexadecimal ? 3 : 2, -1), hexadecimal ? 16 : 10);
}

function validXmlReferences(source: string): boolean {
  for (const character of source) if (!xmlCharacter(character.codePointAt(0) ?? -1)) return false;
  const literalSections: readonly (readonly [string, string])[] = [['<!--', '-->'], ['<![CDATA[', ']]>'], ['<?', '?>']];
  const references = /&(?:amp|lt|gt|apos|quot|#(?:[0-9]+|x[0-9a-fA-F]+));/y;
  let insideTag = false;
  let quote: string | null = null;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (!insideTag && character === '<') {
      const literal = literalSections.find(([open]) => source.startsWith(open, index));
      if (literal) {
        const end = source.indexOf(literal[1], index + literal[0].length);
        if (end < 0) return false;
        index = end + literal[1].length - 1;
        continue;
      }
      insideTag = true;
    } else if (insideTag) {
      if (quote !== null) {
        if (character === '<') return false;
        if (character === quote) quote = null;
      } else if (character === '"' || character === "'") quote = character;
      else if (character === '>') insideTag = false;
    }
    if (character === '&') {
      references.lastIndex = index;
      const match = references.exec(source);
      if (!match || match[0].startsWith('&#') && !xmlCharacter(numericReferencePoint(match[0]))) return false;
      index = references.lastIndex - 1;
    }
  }
  return !insideTag && quote === null;
}

class SitemapEntityDecoder extends EntityDecoder {
  override decode(text: string): string {
    // Compact validated numeric spellings before the upstream 32-character scan; do not expand them here.
    const compact = text.replace(/&#(?:[0-9]+|x[0-9a-fA-F]+);/g, (reference: string) => `&#${numericReferencePoint(reference)};`);
    return super.decode(compact);
  }
}

export async function audit(config: Config): Promise<Report> {
  await rejectSymlinkAncestors(config.publicDir);
  const files = await htmlFiles(config.publicDir);
  if (!files.length) throw new Error(`No HTML files found in ${config.publicDir}; build or export the public site first.`);
  const findings: Finding[] = [];
  const add = (id: string, status: Finding['status'], evidence: string, action: string): void => { findings.push({ id, status, evidence, action }); };
  const robotsPath = join(config.publicDir, 'robots.txt');
  const robotsText = await optionalFile(robotsPath);
  const robots = robotsText === null ? null : robotsParser(`${config.origin}/robots.txt`, robotsText);
  add('robots-file', robots ? 'pass' : 'fail', robotsPath, robots ? 'Review intentional access policy.' : 'Provide the deployed robots.txt artifact.');
  const sitemapPath = join(config.publicDir, 'sitemap.xml');
  const sitemap = await optionalFile(sitemapPath);
  let locations: string[] = [];
  let sitemapData: ReturnType<typeof summarizeSitemap> | null = null;
  if (sitemap === null) add('sitemap', 'fail', `${sitemapPath}: missing`, 'Provide a sitemap for the audited public pages.');
  else if (XMLValidator.validate(sitemap) !== true || /<!DOCTYPE|<!ENTITY/i.test(sitemap) || !validXmlReferences(sitemap)) add('sitemap', 'fail', `${sitemapPath}: invalid or unsupported XML`, 'Use well-formed sitemap XML without DTDs or custom entities.');
  else {
    const parsed: unknown = new XMLParser({
      parseTagValue: false, processEntities: true,
      entityDecoder: new SitemapEntityDecoder({ numericAllowed: true, limit: { maxExpandedLength: 100000, applyLimitsTo: 'all' } }),
    }).parse(sitemap);
    locations = xmlLocations(parsed);
    const isUrlset = typeof parsed === 'object' && parsed !== null && 'urlset' in parsed;
    const valid = locations.length > 0 && locations.every((location) => {
      try { return new URL(location).origin === config.origin; } catch { return false; }
    });
    add('sitemap', isUrlset && valid ? 'pass' : 'fail', `${sitemapPath}: ${locations.length} locations; direct urlset required`, 'Supply a direct sitemap urlset for this export; sitemap indexes are not expanded.');
    if (isUrlset && valid) sitemapData = summarizeSitemap(locations);
  }
  if (sitemapData === null) add('sitemap-duplicates', 'unknown', `${sitemapPath}: duplicate URLs unmeasured without a supported sitemap`, 'Provide a valid direct urlset on the configured origin, then rerun.');
  else {
    const repeated = sitemapData.duplicates.map(({ url, occurrences, positions }) => `${url} occurs ${occurrences} times at positions ${positions.join(', ')}`);
    add('sitemap-duplicates', sitemapData.duplicateEntries > 0 ? 'fail' : 'pass', [`${sitemapPath}: ${sitemapData.entries} entries`, `${sitemapData.uniqueUrls} unique URLs`, `${sitemapData.duplicateEntries} duplicate entries`, ...repeated].join('; '), 'Retain one intended canonical entry per URL and rebuild the export.');
  }
  const coverageUrls = new Set<string>();
  for (const location of locations) {
    try { coverageUrls.add(new URL(location).href); }
    catch { /* Malformed locations already fail the sitemap finding. */ }
  }
  for (const file of files) {
    const page = relative(config.publicDir, file).split(sep).join('/');
    const $ = load(await readFile(file, 'utf8'));
    const check = (name: string, valid: boolean, evidence: string, action: string): void => add(`${page}:${name}`, valid ? 'pass' : 'fail', `${file}: ${evidence}`, action);
    const title = $('title').text().trim();
    check('title', $('title').length === 1 && !!title, title || 'missing title', 'Provide one descriptive title.');
    const description = $('meta[name="description" i]').attr('content')?.trim();
    check('description', !!description, description ?? 'missing description', 'Provide a meaningful description.');
    check('open-graph', !!$('meta[property="og:title"]').attr('content')?.trim() && !!$('meta[property="og:description"]').attr('content')?.trim(), 'og:title and og:description presence', 'Supply truthful social metadata.');
    check('heading', $('h1').text().trim().length > 0, `${$('h1').length} H1 elements`, 'Use a descriptive page heading.');
    const text = $('body').clone().find('script,style,template,noscript').remove().end().text().trim();
    check('readable-text', text.length > 0, `${text.length} non-script text characters in HTML`, 'Include public content in the exported HTML. CSS visibility is not evaluated.');
    const directives = $('meta[name="robots" i],meta[name="googlebot" i]').map((_index, element) => $(element).attr('content') ?? '').get().join(',');
    check('index-directive', !/(?:^|[\s,])(?:noindex|none)(?:$|[\s,])/i.test(directives), directives || 'no restrictive HTML meta directive observed', 'Remove noindex only if this page is intended for indexing. HTTP headers are unmeasured.');
    const canonical = $('link[rel="canonical" i]');
    const href = canonical.attr('href') ?? '';
    let canonicalUrl: URL | null = null;
    try { canonicalUrl = new URL(href); } catch { /* Invalid canonical is recorded below. */ }
    const validCanonical = canonical.length === 1 && canonicalUrl !== null && canonicalUrl.origin === config.origin && !canonicalUrl.hash && !canonicalUrl.username && !canonicalUrl.password;
    check('canonical', validCanonical, href || 'missing canonical', 'Provide one absolute canonical URL on the configured origin.');
    const fallback = new URL(page.replace(/(^|\/)index\.html?$/i, '$1').split('/').map(encodeURIComponent).join('/'), `${config.origin}/`).href;
    const pageUrl = validCanonical && canonicalUrl ? canonicalUrl.href : fallback;
    check('sitemap-coverage', coverageUrls.has(pageUrl), `${pageUrl} in ${sitemapPath}`, 'Add the intended canonical URL to the direct sitemap.');
    for (const bot of ['Googlebot', 'OAI-SearchBot']) {
      const allowed = robots?.isAllowed(fallback, bot);
      add(`${page}:crawler.${bot}`, robots === null || allowed === undefined ? 'unknown' : allowed ? 'pass' : 'fail', `${robotsPath}: ${bot} at inferred export URL ${fallback}; allowed=${String(allowed)}; deployment routes unverified`, 'Review search access separately from training permissions.');
    }
    for (const bot of ['GPTBot', 'Google-Extended']) {
      add(`${page}:training.${bot}`, robots === null ? 'unknown' : 'pass', `${robotsPath}: training policy allowed=${String(robots?.isAllowed(fallback, bot))}; informational only`, 'Preserve the owner\'s training policy; it is not a search eligibility check.');
    }
    const blocks = $('script[type="application/ld+json" i]').toArray();
    if (!blocks.length) add(`${page}:jsonld-syntax`, 'unknown', `${file}: no JSON-LD supplied`, 'Add structured data only when appropriate and supported by visible facts.');
    else for (const [index, block] of blocks.entries()) {
      try {
        const value: unknown = JSON.parse($(block).text());
        const valid = typeof value === 'object' && value !== null;
        check(`jsonld-syntax.${index + 1}`, valid, valid ? 'JSON-LD parses as an object or array' : 'JSON primitive is not a JSON-LD document', 'Review structured-data semantics separately.');
      } catch { check(`jsonld-syntax.${index + 1}`, false, 'JSON parse failed', 'Repair JSON syntax; then validate the actual schema and visible claims.'); }
    }
  }
  add('schema-semantics', 'unknown', 'JSON parsing does not establish Schema.org validity or rich-result eligibility.', 'Use the applicable schema and search validation tools.');
  add('live-indexing', 'unknown', 'Only local HTML/crawler files were read. HTTP status, headers, WAF, JavaScript rendering, indexing, rankings, and citations were not measured.', 'Inspect deployment and supported search tools separately.');
  const llms = await optionalFile(join(config.publicDir, 'llms.txt'));
  add('llms-txt', 'pass', llms === null ? 'Optional llms.txt absent; no readiness penalty.' : 'Optional llms.txt present; no ranking claim.', 'Treat as an optional experiment.');
  return report('audit', config.product.example, `local export: ${config.publicDir}; no network requests or browser execution`, findings, { config: config.path, files, sitemap: sitemapData });
}
