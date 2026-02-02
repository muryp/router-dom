export type TMurypCtxtUrl = {
  params: Record<string, string>;
  query: Record<string, string>;
  url: string;
  id: string;
};
export type TMurypLayoutRoute =
  | string
  | ((ctx: TMurypCtxtUrl, children?: string) => Promise<string> | string);
export type TMurypComponentRoute =
  | string
  | ((args: TMurypCtxtUrl) => Promise<string> | string | undefined);

export type TMurypMiddlewareRoute = (
  args: TMurypCtxtUrl,
) => boolean | Promise<boolean>;

export type TMurypRouteConfig = {
  title?:
    | string
    | ((args: TMurypCtxtUrl) => string | undefined | Promise<string>);
  component?: TMurypComponentRoute;
  layout?: TMurypLayoutRoute; // Tambahkan ini
  middleware?: TMurypMiddlewareRoute;
  script?: (args: TMurypCtxtUrl) => void;
};
export type TMurypRoutes = {
  [path: string]: TMurypRouteConfig | TMurypRoutes | undefined;
  '@404': TMurypRouteConfig;
};
export type TMurypRoutesDomArgs = {
  routes: TMurypRoutes;
  settings: {
    id: string;
    rootUrl?: string; // Contoh: '/foo/'
    middleware?: TMurypMiddlewareRoute;
    script?: (args: TMurypCtxtUrl) => void;
    isFirstRender?: boolean;
  };
};
