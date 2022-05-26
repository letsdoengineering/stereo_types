/** check code is running in browser before using window - Gatsby build will fail otherwise */
const isBrowser = typeof window !== 'undefined'

export const setDataToLocalStorage = (formData: Record<string, any>, key: string): void => {
  if (isBrowser) window.localStorage.setItem(key, JSON.stringify({ ...formData }))
}

/**
 getDataFromLocalStorage: returns a JS Object parsed from the
 value of the key 'previousSearchData' if it has been previously set localStorage.
 It returns undefined if 'previousSearchData' does not exist on localStorage or
 the current time is greater than the value of 'previousSearchData.expiry'
 */
export const getDataFromLocalStorage = (key: string): Record<string, any> => {
  if (!isBrowser) return {}
  const previousSearchData = window.localStorage.getItem(key)
  /** if previousSearchData has not been previously set return undefined */
  if (!previousSearchData) return {}

  return JSON.parse(previousSearchData)
}
