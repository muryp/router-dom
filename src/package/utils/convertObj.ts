// utils/routeUtils.ts
import type { TMurypRoutes } from '../types/global';

export function convertRoutes(routes: TMurypRoutes): TMurypRoutes {
  const result = {} as TMurypRoutes;

  for (const pathKey in routes) {
    if (!Object.prototype.hasOwnProperty.call(routes, pathKey)) continue;

    const routeValue = routes[pathKey];

    // 1. Handling Special Keys (@home, @404)
    if (pathKey.startsWith('@')) {
      result[pathKey] =
        typeof routeValue === 'object' && routeValue !== null
          ? convertRoutes(routeValue as TMurypRoutes)
          : routeValue;
      continue;
    }

    // 2. Pecah path menjadi segmen
    const segments = pathKey.replace(/^\//, '').split('/').filter(Boolean);

    // 3. Jika path Tunggal (tanpa slash)
    if (segments.length <= 1) {
      const finalKey = segments[0] || pathKey;

      if (typeof routeValue === 'object' && routeValue !== null) {
        // Gabungkan jika folder sudah ada (merge)
        result[finalKey] = {
          ...result[finalKey],
          ...convertRoutes(routeValue as TMurypRoutes),
        };
      } else {
        result[finalKey] = routeValue;
      }
      continue;
    }

    // 4. Jika path Nested (dengan slash)
    let current = result;
    segments.forEach((segment, index) => {
      if (!current[segment]) current[segment] = {};

      if (index === segments.length - 1) {
        // Di ujung path, masukkan config
        const val =
          typeof routeValue === 'object' && routeValue !== null
            ? convertRoutes(routeValue as TMurypRoutes)
            : { component: routeValue };

        current[segment] = { ...current[segment], ...val };
      }

      current = current[segment] as TMurypRoutes;
    });
  }

  return result;
}
