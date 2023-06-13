import { Router } from '../types/routers'

export function routerCallback(url: string, LIST_RULE_ROUTES: Router[]): string | 404 {
  for (const RULE_ROUTE of LIST_RULE_ROUTES) {
    const PARAM_URL_NAME: string[] = [] // collection params on link
    /**
    * get name params urls then
    * @type string : regex urls for select params
    */
    const PATERN_URL: string = RULE_ROUTE.url.replace(/\{(\w+)\}/g, (_, param) => {
      PARAM_URL_NAME.push(param)
      return '([^\\/]+)'
    })
    const REGEX_URL = new RegExp(`^${ PATERN_URL }$`)
    /**
    * - cek is url match with get rule route
    * - get param url is have
    */
    const isMatch = url.match(REGEX_URL) as string[]
    if (isMatch) {
      const arg: { [key: string]: string } = {}
      for (let i = 0; i < PARAM_URL_NAME.length; i++) {
        arg[PARAM_URL_NAME[i]] = isMatch[i + 1]
      }
      return RULE_ROUTE.callback(arg)
    }
  }
  return 404
}
/**
* generate component based on list urls
* return string html|404
*/
export function ssg(urls: string[], LIST_RULE_ROUTES: Router[]) {
  return urls.map(url => {
    return routerCallback(url, LIST_RULE_ROUTES)
  })
}
