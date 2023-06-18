import type { ArgObj } from '../types/routers'
/**
 * Converts the given object into an array of strings based on the provided pattern.
 * @param {string} URL_PATERN - The base path pattern.
 * @param {Record<string, any>} ARG_OBJ - The object containing the values for each variable in the pattern.
 * @returns {string[]} - The array of strings generated from the object.
 */
export default function convertUrlArg(URL_PATERN: string, ARG_OBJ: ArgObj): string[] {
  const result: string[] = []

  /**
   * This function takes the first argument and replaces it with a value from ARG_OBJ. If there are still remaining arguments, it will be called again to replace the remaining arguments until there are no more arguments left.
   * @param {Record<string, any>} TRAVERSE_OBJ - The object to traverse.
   * @param {string} CURRENT_URL - The current path generated so far.
   */
  function changeFirstArgUrl(TRAVERSE_OBJ: ArgObj, CURRENT_URL: string): void {
    const KEYS: string[] = Object.keys(TRAVERSE_OBJ)
    const FIRST_KEY: string = KEYS[0]
    const REMAINING_KEYS: string[] = KEYS.slice(1)

    if (REMAINING_KEYS.length === 0) {
      for (const VAL_ARG_FIRST of TRAVERSE_OBJ[FIRST_KEY]) {
        const NEW_URL: string = CURRENT_URL.replace(`{${FIRST_KEY}}`, VAL_ARG_FIRST.toString())
        result.push(NEW_URL)
      }
    } else {
      for (const VAL_ARG_FIRST of TRAVERSE_OBJ[FIRST_KEY]) {
        const NEW_OBJ_ARG: ArgObj = remainingObj(REMAINING_KEYS, TRAVERSE_OBJ)
        const NEW_URL: string = CURRENT_URL.replace(`{${FIRST_KEY}}`, VAL_ARG_FIRST.toString())
        changeFirstArgUrl(NEW_OBJ_ARG, NEW_URL)
      }
    }
  }

  /**
   * Create a new object which is taken from the remaining arguments.
   * @param {string[]} NAME_KEYS - The keys to extract.
   * @param {Record<string, any>} CURRENT_OBJ - The original object.
   * @returns {Record<string, any>} - The new object with extracted keys.
   */
  function remainingObj(NAME_KEYS: string[], CURRENT_OBJ: ArgObj): ArgObj {
    const NEW_OBJ: ArgObj = {}
    for (const NAME_KEY of NAME_KEYS) {
      NEW_OBJ[NAME_KEY] = CURRENT_OBJ[NAME_KEY]
    }
    return NEW_OBJ
  }

  changeFirstArgUrl(ARG_OBJ, URL_PATERN)

  return result
}
