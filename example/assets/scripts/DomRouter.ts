import MurypRoutesDom from '../../../src/app';

MurypRoutesDom({
  routes: {
    '/': {
      component: ({ url }) => `<h1>Home</h1><div>URL: ${url}</div>`,
      title: ({ url }) => `Home - ${url}`,
      script: ({ url }) => {
        console.log('Home script executed', url);
      },
      middleware: ({ url }) => {
        console.log('Home middleware', url);
        return true;
      },
    },
    '/blog': {
      'component': ({ url }) =>
        `<h1>Blog</h1>
          <div>ini list blog</div>
          <div>URL: ${url}</div>
        <a href="#/blog/new">add new</a>
        `,
      'title': ({ url }) => `Blog - ${url}`,
      'script': ({ url }) => {
        console.log('Blog script executed', url);
      },
      'middleware': ({ url }) => {
        console.log('Blog middleware', url);
        return true;
      },
      '/new': {
        component: ({ url }) => `<h1>New Blog Post</h1><div>URL: ${url}</div>`,
        title: ({ url }) => `New Blog - ${url}`,
        script: ({ url }) => {
          console.log('New Blog script executed', url);
        },
        middleware: ({ url }) => {
          console.log('New Blog middleware', url);
          return true;
        },
      },
      '/edit/:id': {
        component: ({ params, url }) =>
          `<h1>Edit ${params.id}</h1><div>URL: ${url}</div>`,
        title: ({ params, url }) => `Edit Blog - ${params.id} - ${url}`,
        script: ({ params, url }) => {
          console.log(`Edit script for id: ${params.id}`, url);
        },
        middleware: ({ params, url }) => {
          console.log(`Edit middleware for id: ${params.id}`, url);
          return true;
        },
      },
    },
    '/about': {
      component: ({ url }) => `<h1>About</h1><div>URL: ${url}</div>`,
      title: ({ url }) => `About - ${url}`,
      script: ({ url }) => {
        console.log('About script executed', url);
      },
      middleware: ({ url }) => {
        console.log('About middleware', url);
        return true;
      },
    },
  },
  settings: {
    id: 'app',
    isFirstRender: true,
  },
});
