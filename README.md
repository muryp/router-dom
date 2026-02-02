## Introducing @muryp/router-dom - A Router and SPA Library for Astro JS

[![npm version](https://img.shields.io/npm/v/@muryp/router-dom.svg?style=flat-square)](https://www.npmjs.com/package/@muryp/router-dom)
[![npm downloads](https://img.shields.io/npm/dm/@muryp/router-dom.svg?style=flat-square)](https://www.npmjs.com/package/@muryp/router-dom)
[![GitHub license](https://img.shields.io/github/license/muryp/router-dom.svg?style=flat-square)](https://github.com/muryp/router-dom/blob/main/LICENSE)

A lightweight and powerful routing library designed for Vanilla JS and Astro JS projects. Build Single Page Applications (SPAs) efficiently with modern features like **Nested Layouts**, **Recursive Async Middleware**, and **Automated Path Resolution**.

### ✨ Key Features

- **Router & SPA Support:** Smooth navigation and dynamic content loading without page refreshes.
- **Nested Layouts:** Wrap components with multiple layers of layouts (e.g., Global Layout > Blog Sidebar > Post Content).
- **Sequential Async Middleware:** Execute security or data checks layer-by-layer from root to leaf before rendering.
- **Path Auto-Converter:** Write flat paths like `blog/post/:id`; the router automatically transforms them into a nested object tree.
- **Base URL Support:** Perfectly handles sub-directory deployments (e.g., `domain.com/foo/`).

### 🚀 Usage

Simply define your routes and execute the router. It is designed to be triggered on initial load and every URL change.

```typescript
import router from './src/example/router';

// this will be render after load if isFirstRender true
router();
```

### 🏗 Core Concepts

#### 1. Nested Layouts

Layouts are functions that receive `context` and `children`. Content from child routes is injected into the `${children}` placeholder.

```typescript
// Example Layout
const MainLayout = (ctx, children) => `
  <nav>Navbar</nav>
  <main>${children}</main> <footer>Footer</footer>
`;
```

#### 2. Async Middleware Chain

Middlewares are executed sequentially. If any middleware returns `false` (or a Promise resolving to `false`), the rendering process stops, and the user is redirected to the Home page.

```typescript
{
  '/admin': {
    middleware: async (ctx) => {
      const session = await checkSession();
      return session.isValid; // If false, the sub-routes below won't render
    },
    '/settings': {
      component: AdminSettings
    }
  }
}

```

### 🔍 Full Example

For a complete implementation including:
✅ **@404** and **@home** handling
✅ **Dynamic Parameters** (`/:id`)
✅ **Nested Layouts** (MainBlog & BlogPost)
✅ **Script Execution** post-rendering

Please refer directly to the example file:
👉 **[`src/example/router.ts`](https://www.google.com/search?q=./src/example/router.ts)**

### ⚙️ Global Settings

Configure the router behavior via the `settings` object:

| Property        | Description                                                           |
| --------------- | --------------------------------------------------------------------- |
| `id`            | Target DOM element ID where content will be rendered (e.g., `'app'`). |
| `rootUrl`       | The base path for your app (e.g., `/foo` for `domain.com/foo/#/`).    |
| `middleware`    | Global async function executed before every navigation.               |
| `script`        | Global function executed after the DOM has been updated.              |
| `isFirstRender` | Set to `true` to force rendering on the first load.                   |

### 🛠 Installation

```bash
npm install @muryp/router-dom
# or
pnpm add @muryp/router-dom

```

### 🧪 Requirements

- **Node.js v20 LTS** or later.
- **TypeScript** is highly recommended for full type safety.

### Contributing

Contributions are welcome! If you encounter issues or have suggestions, please visit the [GitHub repository](https://github.com/muryp/router-dom).

### License

Released under the [MIT License](https://github.com/muryp/router-dom/blob/main/LICENSE).
