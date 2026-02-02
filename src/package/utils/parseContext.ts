import type { TMurypCtxtUrl } from '../types/global';

export function parseContext(id: string): TMurypCtxtUrl {
  const urlObj = new URL(window.location.href);
  const query: Record<string, string> = {};
  
  urlObj.searchParams.forEach((value, key) => {
    query[key] = value;
  });

  return {
    params: {}, // Akan diisi oleh matcher
    query,
    url: window.location.href,
    id,
  };
}
