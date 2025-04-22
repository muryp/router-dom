import type { TMurypRoutes } from '../types/global';

function checkHasDynamicKey(obj: Record<string, unknown>) {
  return Object.keys(obj).some((key) => key.startsWith(':'));
}
function getDynamicKeys(obj: Record<string, unknown>): string[] {
  return Object.keys(obj).filter((key) => key.startsWith(':'));
}

type TReturn = {
  router: TMurypRoutes | undefined;
  params: { [key: string]: string };
};
export default function findRoutes(
  url: string[],
  index: number,
  routes: TMurypRoutes,
  params: { [key: string]: string } = {},
): TReturn {
  const currentSegment = url[index];
  const currentResult = routes[currentSegment];
  const hasDynamic = checkHasDynamicKey(routes);

  if (currentResult === undefined && !hasDynamic) {
    return { router: undefined, params };
  }

  const hasChildren = index + 1 < url.length;
  if (hasChildren) {
    if (hasDynamic) {
      const dynamicKeys = getDynamicKeys(routes);
      params[dynamicKeys[0].replace(':','')] = currentSegment.replace(/^(.*)[#?]/,'$1');
      return findRoutes(
        url,
        index + 1,
        routes[dynamicKeys[0]] as TMurypRoutes,
        params,
      );
    }
    return findRoutes(url, index + 1, currentResult as TMurypRoutes, params);
  }

  if (hasDynamic) {
    const dynamicKeys = getDynamicKeys(routes);
    params[dynamicKeys[0].replace(':','')] = currentSegment.replace(/[#|?].*/,'');
    return {
      router: routes[dynamicKeys[0]] as TMurypRoutes,
      params,
    };
  }
  return {
    router: currentResult as TMurypRoutes,
    params,
  };
}
