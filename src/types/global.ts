type TContextUrl = {
  params: { [key: string]: string };
  query: { [key: string]: string };
  url: string;
  id: string;
};

type RouteComponent =
  | string
  | ((args: TContextUrl) => Promise<string> | string | undefined);

export type TMurypRouteConfig = {
  title?: string | ((args:TContextUrl) => string|undefined|Promise<string>);
  component?: RouteComponent;
  middleware?: (args: TContextUrl) => boolean;
  script?: (args: TContextUrl) => void;
  id?: string;
};

export type TMurypRoutes = {
  [path: string]: TMurypRouteConfig | TMurypRoutes;
};

export type TMurypRoutesDomArgs = {
  routes: TMurypRoutes;
  settings: {
    id: string;
    middleware?: (args: TContextUrl) => boolean;
    script?: (args: TContextUrl) => void;
    notFound?: TMurypRouteConfig;
    isFirstRender?: boolean;
  };
};
