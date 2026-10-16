import type { Config } from './config.ts';
import { report } from './report.ts';
import type { Finding, Report } from './report.ts';

const appleInfo = 'https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/';
const appleVersion = 'https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/';
const playInfo = 'https://support.google.com/googleplay/android-developer/answer/9859152?hl=en';
const limits: Record<string, ReadonlyArray<{ field: string; min: number; max: number; bytes: boolean; source: string }>> = {
  ios: [
    { field: 'name', min: 2, max: 30, bytes: false, source: appleInfo },
    { field: 'subtitle', min: 1, max: 30, bytes: false, source: appleInfo },
    { field: 'keywords', min: 1, max: 100, bytes: true, source: appleVersion },
    { field: 'description', min: 1, max: 4000, bytes: false, source: appleVersion },
  ],
  android: [
    { field: 'title', min: 1, max: 30, bytes: false, source: playInfo },
    { field: 'shortDescription', min: 1, max: 80, bytes: false, source: playInfo },
    { field: 'fullDescription', min: 1, max: 4000, bytes: false, source: playInfo },
  ],
};

export function aso(config: Config): Report {
  const findings: Finding[] = [];
  for (const platform of ['ios', 'android']) {
    if (!config.product.platforms.includes(platform) && !config.product.listings[platform]) continue;
    const listing = config.product.listings[platform];
    if (!listing) {
      findings.push({ id: `${platform}.listing`, status: 'unknown', evidence: `${config.productPath}: no ${platform} listing supplied`, action: 'Supply listing text and locale when available.' });
      continue;
    }
    for (const limit of limits[platform] ?? []) {
      const text = listing.fields[limit.field];
      const count = text === undefined ? null : limit.bytes ? Buffer.byteLength(text, 'utf8') : [...text].length;
      const unit = limit.bytes ? 'UTF-8 bytes' : 'Unicode code points';
      findings.push({
        id: `${platform}.${limit.field}`,
        status: count === null ? 'unknown' : text?.trim() && count >= limit.min && count <= limit.max ? 'pass' : 'fail',
        evidence: `${config.productPath}; ${listing.locale}; ${count ?? 'missing'} ${unit}; accepted range ${limit.min}-${limit.max}; ${limit.source}`,
        action: count === null ? 'Supply this field if applicable.' : `Review the field in the store console; the CLI checks length, not policy acceptance.`,
      });
    }
    const linked = config.product.facts.filter((fact) => listing.factIds.includes(fact.id));
    const sourced = linked.length > 0 && linked.every((fact) => fact.source !== null);
    findings.push({ id: `${platform}.fact-references`, status: sourced ? 'pass' : 'unknown', evidence: `${config.productPath}: supplied references ${linked.map((fact) => `${fact.id} -> ${fact.source ?? 'missing source'}`).join('; ') || 'none'}; sources not fetched`, action: 'Inspect the referenced evidence before approving claims.' });
    findings.push({ id: `${platform}.semantic-claims`, status: 'unknown', evidence: 'Text-to-fact consistency, screenshots, localization quality, conversion, and store acceptance were not verified.', action: 'Review every capability, price, and comparison against source evidence; inspect actual console and image artifacts.' });
  }
  if (!findings.length) findings.push({ id: 'app-listings', status: 'unknown', evidence: 'No mobile platform or listing configured.', action: 'No ASO measurement is available for this product.' });
  return report('aso', config.product.example, 'Local supplied store metadata; no store account access or publishing.', findings);
}
