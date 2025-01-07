export default function html(e: TemplateStringsArray, ...a: Array<string | number | (string | number)[]>) {
  const CONTENT: string[] = []
  if (e.length > 1) {
    const concate = e.map((val, i) => {
      if (typeof val === 'boolean') {
        return ''
      }
      if (i >= e.length - 1) {
        return val
      }
      const arg = typeof a[i] === 'boolean' ? '' : a[i]
      if (Array.isArray(arg)) {
        const argArray = arg.join('')
        return val + argArray
      }
      return val + arg
    })
    CONTENT.push(...concate)
  } else {
    // if (e[0] === 'false' || e[0] === 'true' || e[0] === 'undefined') {
    //   return ''
    // }
    CONTENT.push(e[0])
  }
  return CONTENT.join('')
}
