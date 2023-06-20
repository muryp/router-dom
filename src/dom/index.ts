import { routerCallback } from '../routes/index'
import type { RouterRule } from '../types/routers'

const STORE = {
  NEW_LINK: '',
  CURRENT_URL: '',
  isLinkClick: true,
}
const isNewPage = (TARGET_LINK: string) => {
  return !TARGET_LINK.match('#')
}

const callBack = async (RouteRule: RouterRule) => {
  const URL_PATH = STORE.CURRENT_URL.replace(/#.*/, '').replace(new RegExp(`^${RouteRule.BASE_URL}`, 'i'), '')
  const { html, title, innerHtml, beforeRender, afterRender, domTarget } = await routerCallback(URL_PATH, RouteRule)
  beforeRender && beforeRender()
  document.title = title
  if (!innerHtml) {
    const EL_TARGET_OPTS_GLOBAL = RouteRule.globalDomTarget && RouteRule.globalDomTarget()
    const EL_TARGET_OPTS = EL_TARGET_OPTS_GLOBAL || domTarget && domTarget()
    const ROOT_EL = EL_TARGET_OPTS || document.getElementById('root')
    if (ROOT_EL) {
      ROOT_EL.innerHTML = html
      ROOT_EL.scrollIntoView()
    } else {
      // eslint-disable-next-line no-alert
      alert('err: root/opts element not found')
    }
  }
  STORE.isLinkClick = true
  selectLink(RouteRule)
  afterRender && afterRender()
}

export function selectLink(RouteRule: RouterRule) {
  const GET_LIST_TAG_LINK_EL = document.getElementsByTagName('a')
  for (let i = 0; i < GET_LIST_TAG_LINK_EL.length; i++) {
    const LINK_EL = GET_LIST_TAG_LINK_EL[i]
    const LINK_ATR = LINK_EL.getAttribute('href')
    const LINK = LINK_ATR ? LINK_ATR : ''
    STORE.CURRENT_URL = location.pathname
    if (isNewPage(LINK) && LINK) {
      LINK_EL.onclick = (e) => {
        e.preventDefault()
        STORE.isLinkClick = false
        window.history.pushState({}, '', LINK_ATR)
        if (STORE.CURRENT_URL !== location.pathname) {
          STORE.NEW_LINK = STORE.CURRENT_URL
          STORE.CURRENT_URL = location.pathname
          callBack(RouteRule)
        }
      }
    }
  }
}
export function watchUndoRedo(RouteRule: RouterRule) {
  window.addEventListener('popstate', async function() {
    const CURRENT_URL = location.pathname
    const isNewPageNow = isNewPage(CURRENT_URL)
    // if url change, not from link
    if (STORE.isLinkClick && isNewPageNow) {
      STORE.NEW_LINK = STORE.CURRENT_URL
      STORE.CURRENT_URL = CURRENT_URL
      callBack(RouteRule)
    }
  })
}
