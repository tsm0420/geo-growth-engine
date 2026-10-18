import { isUtf8 } from 'node:buffer';

export function utf8Text(bytes: Buffer, path: string, format: 'JSON' | 'YAML'): string {
  if (!isUtf8(bytes)) throw new Error(`${format} input ${path} must use valid UTF-8`);
  return bytes.toString('utf8');
}
