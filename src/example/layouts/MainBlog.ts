import type { TMurypLayoutRoute } from '../../package/types/global';

export const MainLayout: TMurypLayoutRoute = (_, children) => html`
  <div class="main-app">
    <header><h1>My Blog</h1></header>
    <div class="content">${children || ''}</div>
    <footer>© 2026</footer>
  </div>
`;
