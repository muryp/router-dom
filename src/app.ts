import type { TMurypRoutesDomArgs } from './types/global';
import { convertRoutes } from './utils/convertObj';
import onChange from './utils/onChange';
import render from './utils/render';

export default function MurypRoutesDom(Args: TMurypRoutesDomArgs) {
  // convert router
  Args.routes = convertRoutes(Args.routes);
  Args.routes['@home'] = Args.routes[''];
  delete Args.routes[''];

  if (Args.settings.isFirstRender !== false) {
    render(Args);
  }
  onChange(Args);
}
