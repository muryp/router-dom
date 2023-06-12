import { ssg } from '../dist/index.cjs'

const URLS = [
  '/about',
  '/about/1',
  '/about/1/details',
  '/about/1/setting',
  '/contact/1/setting',
];
const ROUTERS = [
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
    listLink: function(url) {
      const URL_RESULT = []
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

ssg(URLS,ROUTERS)
