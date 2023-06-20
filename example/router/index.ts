import type { RouterRule } from '../../src'

const id: number[] = []
for (let i = 0; i < 15; i++) {
  id.push(i)
}

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
      listLink: { id },
    },
    {
      url: '/about/{id}/details',
      callback: async function(arg: any) {
        const id = arg?.id
        return { html: `page about id: ${id}, details sekali`, title: 'page about by id sekali' }
      },
      listLink: { id },
    },
    {
      url: '/about/{id}/{sub}',
      callback: async function(arg: any) {
        const id = arg?.id
        const sub = arg?.sub
        const title = `pages with ${id} on sub : ${sub}`
        const html = `
<h1>pages with ${id} on sub : ${sub}</h1>
<p>content paragraf with ${id} on sub : ${sub}</p> 
`
        return { html, title}
      },
      listLink: async function() {
        // this function will be execute once in pages
        const sub = ['private', 'public']
        return { id, sub }
      },
    },
  ],
}
