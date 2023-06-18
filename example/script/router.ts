import type { RouterRule } from '../../src'

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
