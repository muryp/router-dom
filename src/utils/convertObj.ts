import type { TMurypRoutes } from '../types/global';

export function convertRoutes(routes: TMurypRoutes): TMurypRoutes {
  const result: TMurypRoutes = {} as TMurypRoutes;

  for (const key in routes) {
    // Skip prototype properties
    if (!Object.prototype.hasOwnProperty.call(routes, key)) continue;

    // Remove leading slash and split by slash
    const cleanKey = key.replace(/^\//, '');
    const parts = cleanKey.split('/');

    if (parts.length > 1) {
      // Nested route
      const [first, ...rest] = parts;
      if (!result[first]) result[first] = {};
      // Recursively transform the nested part
      result[first] = {
        ...result[first],
        ...convertRoutes({ [rest.join('/')]: routes[key] } as TMurypRoutes) ,
      };
    } else {
      // Single level
      if (typeof routes[key] === 'object' && !Array.isArray(routes[key])) {
        result[parts[0]] = convertRoutes(routes[key] as TMurypRoutes);
      } else {
        result[parts[0]] = routes[key];
      }
    }
  }

  return result;
}
