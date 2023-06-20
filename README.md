## Introducing @muryp/router-dom - Router and SPA Library for Astro JS
[![npm version](https://img.shields.io/npm/v/@muryp/router-dom.svg?style=flat-square)](https://www.npmjs.com/package/@muryp/router-dom)
[![npm downloads](https://img.shields.io/npm/dm/@muryp/router-dom.svg?style=flat-square)](https://www.npmjs.com/package/@muryp/router-dom)
[![GitHub license](https://img.shields.io/github/license/muryp/router-dom.svg?style=flat-square)](https://github.com/muryp/router-dom/blob/main/LICENSE)

@muryp/router-dom is a powerful and lightweight routing library specifically designed for Astro JS. It provides seamless integration with Astro JS projects and offers a simple and efficient way to build Single Page Applications (SPAs) without the need for additional frameworks.

### Key Features

- **Router and SPA Support:** @muryp/router-dom enables developers to create robust SPAs and manage client-side routing in Astro JS projects. It provides a smooth navigation experience and allows for dynamic content loading without page refreshes.

- **Astro JS Compatibility:** The library is fully compatible with Astro JS, a modern static site builder for faster websites. By using @muryp/router-dom with Astro JS, you can enjoy the benefits of a static site generator and a powerful routing system together.

- **TypeScript Support:** @muryp/router-dom is built with TypeScript, providing strong typing support for a more reliable and maintainable development experience. TypeScript enables better code quality, editor autocompletion, and catching potential errors during the development process.

### Requirements

To use @muryp/router-dom, make sure you meet the following requirements:

- Astro JS: Ensure you have Astro JS installed in your project. It provides the foundation for building static websites with dynamic capabilities.

- Node.js v16 LTS: The library requires Node.js version 16 (or later) to ensure compatibility and take advantage of the latest JavaScript features.

- TypeScript: It is recommended to use TypeScript for your Astro JS project to leverage the full benefits of @muryp/router-dom's typing support.

### Installation

You can install @muryp/router-dom using one of the following package managers: npm, Yarn, or pnpm.

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

#### configuration
```typescript
import type { RouterRule } from '@muryp/router-dom'

const BASE_URL = import.meta.env.MODE === 'development' ? '' : '/muryp'
export const ROUTER_RULE: RouterRule = {
  NOT_FOUND: { html: '404 not found', title: 'page 404', url: '404' },
  BASE_URL,
  LIST_RULE_ROUTES: [
    {
      url: '/',
      callback: async function() {
        return { html: 'page home', title: 'page home' }
      },
    },
    {
      url: '/about',
      callback: async function() {
        return { html: 'page about', title: 'page about' }
      },
      domTarget: () => {
        return document.getElementById('root')
      },
    },
    {
      url: '/about/{id}',
      callback: async function(arg: any) {
        const id = arg?.id
        return { html: `page about id: ${id}`, title: `page about by id - ${id}` }
      },
      listLink: async function() {
        const id:number[] = []
        for (let i = 0; i < 15; i++) {
          id.push(i)
        }
        return { id }
      },
    },
    {
      url: '/about/{id}/details',
      callback: async function(arg: any) {
        const id = arg?.id
        return { html: `page about id: ${id}, details sekali`, title: 'page about by id sekali' }
      },
      listLink: async function() {
        const id:number[] = []
        for (let i = 0; i < 15; i++) {
          id.push(i)
        }
        return { id }
      },
    },
    {
      url: '/about/{id}/{sub}',
      callback: async function(arg: any) {
        const id = arg?.id
        const sub = arg?.sub
        return { html: `page about id: ${id}, sub: ${sub}`, title: 'page about by id sub' }
      },
      listLink: async function() {
        const id:number[] = []
        for (let i = 0; i < 15; i++) {
          id.push(i)
        }
        return { id, sub: ['private', 'public'] }
      },
    },
  ],
}
```
in astro page :
```astro
---
import { ROUTER_RULE } from "../script/router";
import { generateStaticUrl, callbackReturn } from "../../src";

const LINK = await generateStaticUrl(ROUTER_RULE, 2);
const LINK_FULL = await generateStaticUrl(ROUTER_RULE);

export async function getStaticPaths() {
  const SSG = await generateStaticUrl(ROUTER_RULE);
  SSG.push(ROUTER_RULE.NOT_FOUND);
  return SSG.map((CONTENT) => {
    const slug =
      CONTENT.url !== "/" ? CONTENT.url.replace(/^\//, "") : undefined;
    return {
      params: {
        slug,
      },
      props: CONTENT,
    };
  });
}
const BASE_URL = ROUTER_RULE.BASE_URL;
const { title, html } = Astro.props as callbackReturn;
const lorem:string[] = [];
for (let i = 0; i < 20; i++) {
  lorem.push(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, quasi, nulla illo id doloremque cum itaque quae expedita debitis veniam deleniti! Voluptate animi mollitia, architecto id odio accusantium recusandae rerum."
  );
}
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
  </head><path href={BASE_URL}></path>
  <title>{title}</title>

  <body>
    <a href="2">current path 2</a> |
    <a href="./2">current path 2 with ./</a> |
    <a href="./">current path / del one path</a> |
    <a href="../">behind path / del two path</a> |
    <a href="../2">behind path path 2</a> |
    <a href="/fsadfs">link not found</a> |
    <h2>Link by number</h2>
    <nav>
      {
        LINK.map(({ url, title }) => {
          return <a href={BASE_URL + url}>{title}</a>;
        })
      }
    </nav>
    <h2>All link</h2>
    <nav>
      {
        LINK_FULL.map(({ url, title }) => {
          return <a href={BASE_URL + url}>{title}</a>;
        })
      }
    </nav>
    <a href={BASE_URL + "/#1"}>home 1</a>
    <a href={BASE_URL + "/#15"}>home 15</a>
    <a href={BASE_URL + "/#19"}>home 19</a>
    <h2>Link Lorem</h2>
    {lorem.map((_, i) => <a href={`#${i}`}>{`link ke ${i}`}</a>)}
    <div id="root" set:html={html} />
    {lorem.map((val, i) => <p id={i.toString()}>{val}</p>)}
    <script src="../script/domRoute.ts"></script>
  </body>
</html>
```

### Contributing

Contributions to @muryp/router-dom are highly appreciated. If you encounter any issues, have suggestions, or would like to contribute new features, please visit the [GitHub repository](https://github.com/muryp/router-dom) to get involved.

### License



@muryp/router-dom is released under the [MIT License](https://github.com/muryp/router-dom/blob/main/LICENSE), granting you the freedom to use, modify, and distribute the library according to your requirements.

---

@muryp/router-dom provides a seamless integration of routing capabilities into your Astro JS projects. With its compatibility, lightweight nature, and TypeScript support, you can easily build powerful Single Page Applications without the need for additional frameworks. Start using @muryp/router-dom today and take your Astro JS projects to the next level!
