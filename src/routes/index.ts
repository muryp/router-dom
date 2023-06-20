import type { Router, RouterRule, callbackReturn } from '../types/routers'
import convertUrlArg from './ssg'

export async function routerCallback(url: string, { LIST_RULE_ROUTES, NOT_FOUND }: RouterRule): Promise<callbackReturn> {
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
    const REGEX_URL = new RegExp(`^${PATERN_URL}$`)
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
      const callbackContent = await RULE_ROUTE.callback(arg)
      return { ...RULE_ROUTE, ...callbackContent, url }
    }
  }
  return { ...NOT_FOUND, url }
}
/**
* generate component based on list urls
* return string html|404
*/
export async function generateStaticUrl(RULE_ROUTES: RouterRule, ARG?: { URL?: string, NUM?: number }): Promise<callbackReturn[]> {
  const LIST_CONTENT: callbackReturn[] = []
  const { LIST_RULE_ROUTES, NOT_FOUND } = RULE_ROUTES
  const cekLink = async ({ url, listLink }: Router) => {
    const haveArgs = url.match(/\{.*\}/)
    if (haveArgs) {
      if (listLink) {
        const LIST_LINK = typeof listLink === 'function' ? listLink() : listLink
        const LIST_URL = convertUrlArg(url, await LIST_LINK)
        await Promise.all(LIST_URL.map(async URL => {
          const CONTENT = await routerCallback(URL, RULE_ROUTES)
          LIST_CONTENT.push(CONTENT)
        }))
        return
      }
      LIST_CONTENT.push({ ...NOT_FOUND, url })
      return
    }
    LIST_CONTENT.push(await routerCallback(url, RULE_ROUTES))
    return
  }
  if (ARG?.NUM) {
    await cekLink(LIST_RULE_ROUTES[ARG.NUM])
    return LIST_CONTENT
  }
  if (ARG?.URL) {
    for (let i = 1; i < LIST_RULE_ROUTES.length; i++) {
      const isMatch = LIST_RULE_ROUTES[i-1].url.match(ARG.URL)
      if (isMatch) {
        await cekLink(LIST_RULE_ROUTES[i-1])
        break
      }
    }
    return LIST_CONTENT
  }
  await Promise.all(LIST_RULE_ROUTES.map(async (val) => await cekLink(val)))
  return LIST_CONTENT
}
