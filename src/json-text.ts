import { isUtf8 } from 'node:buffer';

export function jsonText(bytes: Buffer, path: string): string {
  if (!isUtf8(bytes)) throw new Error(`JSON input ${path} must use valid UTF-8`);
  return bytes.toString('utf8');
}
