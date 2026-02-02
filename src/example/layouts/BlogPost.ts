import type { TMurypLayoutRoute } from '../../package/types/global';

export const BlogLayout: TMurypLayoutRoute = (_, children) => html`
  <div class="blog-container">
    <aside>
      <h3>Blog Sidebar</h3>
      <ul>
        <li>Recent Posts</li>
      </ul>
    </aside>
    <section class="post-wrapper">${children || ''}</section>
  </div>
`;
