import type { TMurypCtxtUrl } from '../../../package/types/global';
import { blogData, type Blog } from './data';
import './style-blog.css';

function renderSinglePost(post: Blog): string {
  return html`
    <div
      class="blog-post-detail"
      style="max-width: 800px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <header
        style="border-bottom: 2px solid #f4f4f4; margin-bottom: 20px; padding-bottom: 10px;">
        <small
          style="color: #3498db; font-weight: bold; text-transform: uppercase;"
          >${post.category}</small
        >
        <h1 style="font-size: 2.5rem; margin: 10px 0; color: #2c3e50;">
          ${post.title}
        </h1>
        <p style="color: #999; font-size: 0.9rem;">
          Diterbitkan pada ${post.date} oleh <strong>${post.author}</strong>
        </p>
      </header>

      <div
        class="post-content"
        style="line-height: 1.8; color: #444; font-size: 1.1rem;">
        ${post.content}
      </div>

      <footer
        style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <a
          href="#/blog"
          style="color: #3498db; text-decoration: none; font-weight: bold;"
          >← Kembali ke Daftar Blog</a
        >
      </footer>
    </div>
  `;
}

export default function ({ params }: TMurypCtxtUrl) {
  const id = params.id;
  const post = blogData[Number(id) - 1];
  return renderSinglePost(post);
}
