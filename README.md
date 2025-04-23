## Introducing @muryp/router-dom - A Router and SPA Library for Astro JS

[![npm version](https://img.shields.io/npm/v/@muryp/router-dom.svg?style=flat-square)](https://www.npmjs.com/package/@muryp/router-dom)
[![npm downloads](https://img.shields.io/npm/dm/@muryp/router-dom.svg?style=flat-square)](https://www.npmjs.com/package/@muryp/router-dom)
[![GitHub license](https://img.shields.io/github/license/muryp/router-dom.svg?style=flat-square)](https://github.com/muryp/router-dom/blob/main/LICENSE)

@muryp/router-dom is a lightweight and powerful routing library designed specifically for Astro JS or just vanilla. It seamlessly integrates with Astro JS projects, enabling developers to build Single Page Applications (SPAs) efficiently without requiring additional frameworks.

### Key Features

- **Router and SPA Support:** @muryp/router-dom allows developers to create robust SPAs and manage client-side routing in Astro JS projects. It provides smooth navigation and dynamic content loading without page refreshes.

- **Astro JS Compatibility:** Fully compatible with Astro JS, a modern static site generator for building fast websites. By combining @muryp/router-dom with Astro JS, you can enjoy the benefits of static site generation alongside a powerful routing system.

- **TypeScript Support:** Built with TypeScript, @muryp/router-dom offers strong typing for a more reliable and maintainable development experience. TypeScript enhances code quality, provides editor autocompletion, and helps catch potential errors during development.

### Requirements

To use @muryp/router-dom, ensure the following prerequisites are met:

- **Astro JS:** Install Astro JS in your project as it serves as the foundation for building static websites with dynamic capabilities.
- **Node.js v20 LTS or later:** The library requires Node.js version 16 or newer to ensure compatibility and leverage modern JavaScript features.
- **TypeScript:** Using TypeScript is recommended to fully utilize the library's typing support.

### Installation

Install @muryp/router-dom using your preferred package manager:

**NPM:**

```bash
npm install @muryp/router-dom
```

**Yarn:**

```bash
yarn add @muryp/router-dom
```

**PNPM:**

```bash
pnpm add @muryp/router-dom
```

### Usage

For usage examples, refer to the following files:

- `./example/assets/scripts/DomRouter.ts`
- `./src/types/global.ts`

#### Router Configuration

- **`component`**: Renders the component or HTML.
- **`title`**: Sets the page title.
- **`middleware`**: Executes before rendering. If it returns `false`, rendering and scripts are skipped.
- **`script`**: Executes after rendering.
- **Middleware**: Middleware functions are executed before rendering a route. They can be used for authentication, logging, or other pre-render checks. If the middleware returns `false`, the rendering and scripts for the route will be skipped.

  Example:

  ```typescript
  {
    '/dashboard': {
      middleware: ({ params, url, query }) => {
        if (!query.authenticated) {
          console.log('Access denied:', url);
          return false; // Prevent rendering
        }
        console.log('Access granted:', url);
        return true; // Allow rendering
      }
    }
  }
  ```

- **Script**: Scripts are executed after the route is rendered. They can be used for initializing components, attaching event listeners, or other post-render tasks.

  Example:

  ```typescript
  {
    '/profile/:id': {
      script: ({ params, url, query }) => {
        console.log(`Profile script executed for ID: ${params.id}`, url, query);
        // Initialize profile-specific components here
      }
    }
  }
  ```

#### URL Configuration

- **`@404`**: Required for handling invalid or not-found URLs.
- **`@home` or `/`**: Required for defining the home route.
- **Dynamic Parameters**: Use `/product/:id` and access parameters like this:
  ```javascript
  ({ params }) => {
    const { id } = params;
  };
  ```
- **Nested URLs**: Define nested routes like `/product/:id/detail` or:

  ```typescript
  {
    '/product/:id': {
      '/detail': {}
    }
  }

  ```

- **Query**: Query parameters from the URL can be accessed in the `query` object. This is useful for passing additional data to routes.

  Example:

  ```typescript
  {
    '/search': {
      component: ({ query }) => `
        <h1>Search Results</h1>
        <div>Query: ${JSON.stringify(query)}</div>
      `,
      script: ({ query }) => {
        console.log('Search query:', query);
      }
    }
  }
  ```

  Example URL: `http://example.com/#/search?term=astro&category=js`

#### Global Settings

- **`id`**: Specifies the target element ID for rendering.
- **`middleware`**: Defines global middleware.
- **`script`**: Executes global scripts.
- **`isFirstRender`**: Prevents rendering on the first load, useful for SSR/SSG.

### Contributing

Contributions to @muryp/router-dom are welcome! If you encounter issues, have suggestions, or want to contribute new features, visit the [GitHub repository](https://github.com/muryp/router-dom) to get involved.

### License

@muryp/router-dom is released under the [MIT License](https://github.com/muryp/router-dom/blob/main/LICENSE), allowing you to use, modify, and distribute the library as needed.
