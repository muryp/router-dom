import { blogData, type Blog } from './data';

/**
 * 3. Fungsi Render List (Menggunakan properti 'excerpt')
 */
function renderBlogList(posts: Blog[]): string {
  const render = posts
    .map(
      (post) => html`
        <article
          class="blog-card"
          style="background: #fff; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border: 1px solid #eee;">
          <small
            style="color: #3498db; font-weight: bold; text-transform: uppercase;"
            >${post.category}</small
          >
          <h2 style="margin: 10px 0; color: #2c3e50;">${post.title}</h2>
          <p style="color: #666; margin-bottom: 15px;">${post.excerpt}</p>
          <div
            style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: #999;">
            <span>Oleh ${post.author} | ${post.date}</span>
            <a
              href="#/blog/${post.id}"
              style="color: #3498db; font-weight: 600; text-decoration: none;"
              >Baca Selengkapnya →</a
            >
          </div>
        </article>
      `,
    )
    .join('');

  return html`<div
    class="blog-list-container"
    style="max-width: 800px; margin: 0 auto;">
    ${render}
  </div>`;
}

export default function blogListPage() {
  return renderBlogList(blogData);
}
