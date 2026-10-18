import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { parseDocument } from 'yaml';
import { utf8Text } from './utf8-text.ts';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function object(value: unknown, label: string): Record<string, unknown> {
  if (!isObject(value)) throw new Error(`${label} must be an object`);
  return value;
}

export function string(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be a nonempty string`);
  return value;
}

export function strings(value: unknown, label: string): string[] {
  if (!Array.isArray(value)) throw new Error(`${label} must be a list`);
  return value.map((item: unknown) => string(item, label));
}

export function webUrl(value: unknown, label: string): URL {
  const url = new URL(string(value, label));
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error(`${label} must be an HTTP(S) URL without credentials`);
  return url;
}

export async function yamlObject(path: string): Promise<Record<string, unknown>> {
  const document = parseDocument(utf8Text(await readFile(path), path, 'YAML'), { uniqueKeys: true });
  if (document.errors.length || document.warnings.length) {
    throw new Error(`${path}: ${[...document.errors, ...document.warnings].map((item) => item.message).join('; ')}`);
  }
  const value: unknown = document.toJS({ maxAliasCount: 50 });
  const result = object(value, path);
  if (result.version !== 1) throw new Error(`${path}: version must be 1`);
  return result;
}

export interface Fact { id: string; claim: string; source: string | null }
export interface Listing { locale: string; factIds: string[]; fields: Record<string, string> }
export interface Product {
  name: string; example: boolean; aliases: string[]; ownedOrigins: string[];
  platforms: string[]; competitors: string[]; facts: Fact[]; listings: Record<string, Listing>;
}
export interface Config {
  path: string; origin: string; publicDir: string; productPath: string; queriesPath: string; product: Product;
}
export interface Query { id: string; query: string; intent: string; priority: number; factIds: string[] }

function unique(values: string[], label: string): string[] {
  if (new Set(values).size !== values.length) throw new Error(`${label} must not contain duplicates`);
  return values;
}

export async function loadConfig(path: string): Promise<Config> {
  const fullPath = resolve(path);
  const raw = await yamlObject(fullPath);
  const originUrl = webUrl(raw.origin, 'origin');
  if (originUrl.href !== `${originUrl.origin}/`) throw new Error('origin must not contain a path, query, or fragment');
  const base = dirname(fullPath);
  const productPath = resolve(base, string(raw.product, 'product'));
  const product = await yamlObject(productPath);
  if (typeof product.example !== 'boolean') throw new Error('product.example must be true or false');
  if (!Array.isArray(product.facts)) throw new Error('product.facts must be a list');
  const facts = product.facts.map((value: unknown): Fact => {
    const fact = object(value, 'fact');
    return {
      id: string(fact.id, 'fact.id'), claim: string(fact.claim, 'fact.claim'),
      source: fact.source === undefined || fact.source === null ? null : webUrl(fact.source, 'fact.source').href,
    };
  });
  unique(facts.map((fact) => fact.id), 'fact IDs');
  const ownedOrigins = unique(strings(product.ownedOrigins, 'ownedOrigins').map((value) => {
    const url = webUrl(value, 'ownedOrigin');
    if (url.href !== `${url.origin}/`) throw new Error('ownedOrigins must contain origins without paths');
    return url.origin;
  }), 'ownedOrigins');
  if (!ownedOrigins.includes(originUrl.origin)) throw new Error('origin must be included in ownedOrigins');
  const platforms = unique(strings(product.platforms, 'platforms'), 'platforms');
  if (platforms.some((value) => !['web', 'ios', 'android'].includes(value))) throw new Error('platforms must be web, ios, or android');
  const listings: Record<string, Listing> = {};
  for (const [platform, value] of Object.entries(object(product.listings === undefined ? {} : product.listings, 'listings'))) {
    if (!['ios', 'android'].includes(platform)) throw new Error(`Unsupported listing platform: ${platform}`);
    const listing = object(value, `${platform} listing`);
    const fields: Record<string, string> = {};
    for (const [key, field] of Object.entries(listing)) {
      if (key !== 'locale' && key !== 'factIds') {
        if (typeof field !== 'string') throw new Error(`${platform}.${key} must be a string`);
        fields[key] = field;
      }
    }
    const factIds = unique(strings(listing.factIds === undefined ? [] : listing.factIds, 'listing.factIds'), 'listing.factIds');
    if (factIds.some((id) => !facts.some((fact) => fact.id === id))) throw new Error(`${platform} listing references an unknown fact ID`);
    listings[platform] = { locale: string(listing.locale, 'listing.locale'), factIds, fields };
  }
  return {
    path: fullPath, origin: originUrl.origin,
    publicDir: resolve(base, string(raw.publicDir, 'publicDir')), productPath,
    queriesPath: resolve(base, string(raw.queries, 'queries')),
    product: {
      name: string(product.name, 'product.name'), example: product.example,
      aliases: unique(strings(product.aliases === undefined ? [] : product.aliases, 'aliases'), 'aliases'), ownedOrigins,
      platforms, competitors: unique(strings(product.competitors === undefined ? [] : product.competitors, 'competitors'), 'competitors'), facts, listings,
    },
  };
}

export async function loadQueries(config: Config): Promise<Query[]> {
  const raw = await yamlObject(config.queriesPath);
  if (!Array.isArray(raw.queries)) throw new Error('queries must be a list');
  const queries = raw.queries.map((value: unknown): Query => {
    const query = object(value, 'query');
    if (typeof query.priority !== 'number' || !Number.isInteger(query.priority) || query.priority < 1 || query.priority > 3) {
      throw new Error('query.priority must be 1, 2, or 3');
    }
    const factIds = unique(strings(query.factIds, 'query.factIds'), 'query.factIds');
    if (factIds.some((id) => !config.product.facts.some((fact) => fact.id === id))) throw new Error('Query references an unknown fact ID');
    return { id: string(query.id, 'query.id'), query: string(query.query, 'query.query'), intent: string(query.intent, 'query.intent'), priority: query.priority, factIds };
  });
  unique(queries.map((query) => query.id), 'query IDs');
  return queries;
}
