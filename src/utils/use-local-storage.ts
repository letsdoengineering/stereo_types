/** check code is running in browser before using window - Gatsby build will fail otherwise */
const isBrowser = typeof window !== 'undefined'

export const setDataToLocalStorage = (object: Record<string, any>, key: string): void => {
  if (isBrowser) window.localStorage.setItem(key, JSON.stringify({ ...object }))
}

/**
 getDataFromLocalStorage: returns a JS Object parsed from the
 value of the key 'previousSearchData' if it has been previously set localStorage.
 It returns undefined if 'previousSearchData' does not exist on localStorage or
 the current time is greater than the value of 'previousSearchData.expiry'
 */
export const getDataFromLocalStorage = (key: string): Record<string, any> => {
  if (!isBrowser) return {}
  const data = window.localStorage.getItem(key)
  if (!data) return {}
  return JSON.parse(data)
}
