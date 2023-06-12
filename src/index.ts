interface Router {
  url: string;
  callback: (arg?: any) => string;
  listLink?: (url: string) => string[]
}

const ROUTERS: Router[] = [
  {
    url: '/about',
    callback: function() {
      return 'page about';
    }
  },
  {
    url: '/about/{id}',
    callback: function(arg) {
      const id = arg?.id;
      return 'page about id: ' + id;
    },
    listLink: function(url: string) {
      const URL_RESULT: string[] = []
      for (let i = 0; i < 15; i++) {
        URL_RESULT.push(url.replace(/{.*}/, `${i}`))
      }
      return URL_RESULT
    }
  },
  {
    url: '/about/{id}/details',
    callback: function(arg) {
      const id = arg?.id;
      return 'page about id: ' + id + ', details sekali';
    }
  },
  {
    url: '/about/{id}/{sub}',
    callback: function(arg) {
      const id = arg?.id;
      const sub = arg?.sub;
      return 'page about id: ' + id + ', sub: ' + sub;
    }
  },
];

function findCallback(url: string): string | undefined {
  for (const router of ROUTERS) {
    const { url: routerUrl } = router;
    const params: string[] = [];
    const pattern = routerUrl.replace(/\{(\w+)\}/g, (_, param) => {
      params.push(param);
      return '([^\\/]+)';
    });
    const regex = new RegExp('^' + pattern + '$');
    const match = url.match(regex) as string[] // list args/params
    if (match) {
      const arg: { [key: string]: string } = {};
      for (let i = 0; i < params.length; i++) {
        arg[params[i]] = match[i + 1];
      }
      return router.callback(arg);
    }
  }
  return undefined;
}

// Contoh penggunaan
const URLS = [
  '/about',
  '/about/1',
  '/about/1/details',
  '/about/1/setting',
  '/contact/1/setting',
]
URLS.forEach((url) => {
  const callback = findCallback(url);
  if (callback) {
    console.log(callback); // Output: page about id: 123, sub: subpage
  } else {
    console.log('404 Not Found');
  }
})
