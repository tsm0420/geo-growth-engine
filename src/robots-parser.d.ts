// The package's CommonJS declaration exposes a namespace under NodeNext.
// This describes the callable default export exercised by the CLI audit tests.
declare module 'robots-parser' {
  export default function robotsParser(url: string, text: string): {
    isAllowed(url: string, userAgent: string): boolean | undefined;
  };
}
