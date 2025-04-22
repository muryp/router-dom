import type { TMurypRouteConfig, TMurypRoutesDomArgs } from '../types/global';
import findRoutes from './findRoutes';

// TODO: EXECUTE MIDDLEWARE AND SCRIPT BEFORE  AND AFTER RENDERING
export default async function render({
  routes,
  settings,
}: TMurypRoutesDomArgs) {
  const CURR_URL = window.location.href;
  const getCurrUrl = new URL(CURR_URL).hash.replace(/\?.*/, '').split('/');

  let getRoute: TMurypRouteConfig | undefined = undefined;

  if (getCurrUrl.length === 1 || getCurrUrl[1] === '') {
    getRoute = routes['@home'] as TMurypRouteConfig;
  }
  getCurrUrl.shift();
  const Args = {
    params: {},
    query: {},
    url: CURR_URL,
    id: settings.id,
  };
  if (getRoute === undefined) {
    const checkRoutes = findRoutes(getCurrUrl, 0, routes);
    Args.params = checkRoutes.params;
    getRoute = checkRoutes.router as TMurypRouteConfig | undefined;
  }

  // 404 NOT FOUND
  if (getRoute === undefined) {
    const notFound = routes['@404'] as TMurypRouteConfig;

    if (notFound?.middleware) {
      const checkMiddleware = notFound.middleware(Args);
      if (checkMiddleware === false) {
        return;
      }
    }

    const COMPONENT = notFound.component;
    if (COMPONENT) {
      if (typeof COMPONENT === 'string') {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById(settings.id)!.innerHTML = COMPONENT;
      } else {
        const COMPONENT_FUNC = await COMPONENT(Args);
        if (typeof COMPONENT_FUNC === 'string') {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          document.getElementById(settings.id)!.innerHTML = COMPONENT_FUNC;
        }
      }

      if (notFound.script) {
        notFound.script(Args);
      }
    }

    return;
  }

  // GET QUERY
  const QUERY: string | { [key: string]: string } = CURR_URL.split('?')[1];
  if (QUERY) {
    Args.query = QUERY.split('&').reduce(
      (acc: { [key: string]: string }, curr: string) => {
        const [key, value] = curr.split('=');
        acc[key] = decodeURIComponent(value);
        return acc;
      },
      {},
    );
  }

  // MIDDLEWARE
  if (getRoute.middleware) {
    const checkMiddleware = getRoute.middleware(Args);
    if (checkMiddleware === false) {
      const prevUrl = window.history.state?.prevUrl;
      if (prevUrl) {
        window.history.pushState({}, '', prevUrl);
      }
      return;
    }
  }
  // CHANGE TITLE
  if (getRoute.title) {
    if (typeof getRoute.title === 'string') {
      document.title = getRoute.title;
    } else {
      const title = await getRoute.title(Args);
      if (typeof title === 'string') {
        document.title = title;
      }
    }
  }

  // GOTO TOP ELEMENT
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // RENDER COMPONENT
  const COMPONENT = getRoute.component;
  if (COMPONENT) {
    if (typeof COMPONENT === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById(settings.id)!.innerHTML = COMPONENT;
    } else {
      const COMPONENT_FUNC = await COMPONENT(Args);
      if (typeof COMPONENT_FUNC === 'string') {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById(settings.id)!.innerHTML = COMPONENT_FUNC;
      }
    }
  }

  // GOTO ID
  const getId = CURR_URL.split('#');
  if (getId.length === 3) {
    const ID = getId[2];
    const getEl = document.getElementById(ID);
    if (getEl) {
      getEl.scrollIntoView();
    }
  }

  // RUN SCRIPT
  if (getRoute.script) {
    getRoute.script(Args);
  }
}
