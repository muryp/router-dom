export type callbackReturn = {
  html: string,
  title: string,
  url: string,
  domTarget?: () => HTMLElement | null
  beforeRender?: () => void
  afterRender?: () => void
  innerHtml?:boolean
}
type routerCallback = { html: string, title: string }
export interface Router {
  url: string
  callback: (arg?: { [key: string]: string }) => Promise<routerCallback>
  listLink?: ArgObj | (() => Promise<ArgObj>)
  beforeRender?: () => void
  afterRender?: () => void
  domTarget?: () => HTMLElement | null
  innerHtml?:boolean
}
export interface RouterRule {
  NOT_FOUND: callbackReturn
  BASE_URL: string
  LIST_RULE_ROUTES: Router[]
  globalDomTarget?: () => HTMLElement | null
}
export type ArgObj = { [key: string]: (string | number)[] }
