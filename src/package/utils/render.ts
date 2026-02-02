import { matchRouteLogic, parseUrlLogic } from './routerCore';
import type {
  TMurypRoutesDomArgs,
  TMurypRouteConfig,
  TMurypCtxtUrl,
  TMurypComponentRoute,
} from '../types/global';

/**
 * Helper untuk mengeksekusi component/layout baik berupa string maupun function
 */
async function executeComponent(
  c: TMurypComponentRoute,
  args: TMurypCtxtUrl,
  children?: string,
): Promise<string> {
  if (typeof c === 'string') return c;
  // Pastikan signature function menerima (context, children)
  const result = await (c as any)(args, children);
  return result || '';
}

export default async function render({
  routes,
  settings,
}: TMurypRoutesDomArgs) {
  const rawUrl = window.location.href;
  const rawHash = window.location.hash;

  const { segments, query, anchor } = parseUrlLogic(
    rawUrl,
    rawHash,
    settings.rootUrl,
  );
  let { configs, params } = matchRouteLogic(segments, routes);
  const context: TMurypCtxtUrl = { params, query, url: rawUrl, id: settings.id };

  // A. Fallback 404 jika config kosong
  const isNotFound = configs.length === 0 || !configs.some((c) => c.component);
  const finalConfigs = isNotFound
    ? [routes['@404'] as TMurypRouteConfig]
    : configs;

  // B. EXECUTE MIDDLEWARE CHAIN (Sequential)
  // 1. Global Setting Middleware
  if (settings.middleware && settings.middleware(context) === false) {
    return redirectToHome();
  }

  // 2. Route Middlewares (dari Root ke Leaf)
  for (const conf of finalConfigs) {
    if (conf.middleware) {
      const allowed = await conf.middleware(context); // Support async middleware
      if (allowed === false) {
        return redirectToHome();
      }
    }
  }

  // C. RENDERING LOGIC (Nested Layouts)
  let renderedHTML = '';
  const reversed = [...finalConfigs].reverse();

  const leaf = reversed.find((c) => c.component);
  if (leaf?.component) {
    renderedHTML = await executeComponent(leaf.component, context);
  }

  for (const conf of reversed) {
    if (conf.layout) {
      renderedHTML = await executeComponent(conf.layout, context, renderedHTML);
    }
  }

  // D. DOM & Side Effects
  const container = document.getElementById(settings.id);
  if (container) container.innerHTML = renderedHTML;

  // Title & Scripts
  updateTitle(reversed, context);
  finalConfigs.forEach((c) => c.script?.(context));
  settings.script?.(context);

  if (anchor) document.getElementById(anchor)?.scrollIntoView();
}

function redirectToHome() {
  // Ganti hash ke root. Ini akan mentrigger event hashchange
  // dan menjalankan render() ulang secara otomatis.
  window.location.hash = '#/';
}

async function updateTitle(
  reversedConfigs: TMurypRouteConfig[],
  context: TMurypCtxtUrl,
) {
  const titleConfig = reversedConfigs.find((c) => c.title);
  if (titleConfig?.title) {
    const title =
      typeof titleConfig.title === 'function'
        ? await titleConfig.title(context)
        : titleConfig.title;
    if (title) document.title = title;
  }
}
