import type { TMurypRoutes, TMurypRouteConfig } from '../types/global';

// 1. Logic Pencarian Route (Pure)
export function matchRouteLogic(segments: string[], routes: TMurypRoutes) {
  let current: any = routes;
  const params: Record<string, string> = {};
  const configs: TMurypRouteConfig[] = [];

  // 1. Ambil middleware/layout dari level root (jika ada)
  if (current.middleware || current.layout) {
    configs.push({ 
      middleware: current.middleware, 
      layout: current.layout 
    } as TMurypRouteConfig);
  }

  // 2. Handle Home
  if (segments.length === 0) {
    if (routes['@home']) configs.push(routes['@home'] as TMurypRouteConfig);
    return { configs, params };
  }

  // 3. Telusuri Segments
  for (const segment of segments) {
    if (!current || typeof current !== 'object') break;

    let nextNode = current[segment];
    if (!nextNode) {
      const dynamicKey = Object.keys(current).find(k => k.startsWith(':'));
      if (dynamicKey) {
        params[dynamicKey.slice(1)] = segment;
        nextNode = current[dynamicKey];
      } else {
        return { configs: [], params: {} }; 
      }
    }
    current = nextNode;
    // Kumpulkan setiap config yang dilewati
    if (current.layout || current.component || current.middleware) {
      configs.push(current as TMurypRouteConfig);
    }
  }

  return { configs, params };
}
// 2. Logic Parsing URL (Pure)
export function parseUrlLogic(fullUrl: string, hash: string, rootUrl: string = '/') {
  // Normalisasi rootUrl agar konsisten
  const normalizedRoot = rootUrl.replace(/\/$/, '') + '/';
  
  // Ambil pathname dari URL dan buang rootUrl-nya
  const urlObj = new URL(fullUrl);
  const cleanPathname = urlObj.pathname.replace(normalizedRoot, '');

  // Parsing Hash (misal: #/blog/1?q=search)
  const [hashAndQuery, anchor] = hash.replace(/^#/, '').split('#');
  const [hashPath, queryString] = hashAndQuery.split('?');

  // Gabungkan segments dari pathname dan hash (filter string kosong)
  const segments = `${cleanPathname}/${hashPath}`.split('/').filter(Boolean);

  const query: Record<string, string> = {};
  if (queryString) {
    new URLSearchParams(queryString).forEach((val, key) => {
      query[key] = val;
    });
  }

  return { segments, query, anchor };
}
