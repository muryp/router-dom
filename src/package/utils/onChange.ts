import type { TMurypRoutesDomArgs } from '../types/global';
import render from './render';

export default function onChange(Args: TMurypRoutesDomArgs) {
  window.onpopstate = async () => {
    render(Args);
  };
}
