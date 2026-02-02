import MurypRoutesDom from '../package/app';
import { executeScripts, resetScripts } from '../package/module/addScript';
import { resetId } from '../package/module/id';
import type { TMurypRoutes } from '../package/types/global';
import { BlogLayout } from './layouts/BlogPost';
import { MainLayout } from './layouts/MainBlog';
import AboutPage from './pages/about';
import blog from './pages/blog';
import blogListPage from './pages/blog/list';
import HomePage from './pages/home';

const routes: TMurypRoutes = {
  '@404': {
    component: ({ url }) => `<h1>404 Not Found</h1><div>URL: ${url}</div>`,
    title: ({ url }) => `404 - ${url}`,
    script: ({ url }) => {
      console.log('404 script executed', url);
    },
  },
  '/': {
    component: HomePage,
    title: ({ url }) => `Home - ${url}`,
    script: ({ url }) => {
      console.log('Home script executed', url);
    },
    middleware: ({ url }) => {
      console.log('Home middleware', url);
      return true;
    },
  },
  '/example/nested/url': {
    component: () => html`<b>example nested url</b>`,
  },
  '/blog': {
    'layout': MainLayout,
    'component': blogListPage,
    'title': ({ url }) => `Blog - ${url}`,
    'script': ({ url }) => {
      console.log('Blog script executed', url);
    },
    'middleware': () => {
      console.log('hello from blog middleware');
      return true;
    },
    '/:id': {
      middleware: () => {
        console.log('hello from blog post');
        return true;
      },
      layout: BlogLayout,
      component: blog,
    },
  },
  '/about': {
    component: AboutPage,
    title: ({ url }) => `About - ${url}`,
  },
};

export default function router() {
  MurypRoutesDom({
    routes,
    settings: {
      id: 'app',
      isFirstRender: true,
      rootUrl: '/foo',
      middleware: () => {
        console.log('hello from root middleware');
        resetScripts();
        resetId();
        return true;
      },
      script: () => {
        executeScripts();
      },
    },
  });
}
