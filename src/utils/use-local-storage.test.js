import {
  getPreviousSearchDataFromLocalStorage,
  setPreviousSearchDataToLocalStorage,
} from './use-local-storage'

const PREVIOUS_SEARCH_DATA = 'previousSearchData'
const EXPIRY_TIME_MS = 900000

jest.useFakeTimers().setSystemTime(Date.now())
let mockStore = {}
const mockLocalStorage = {
  getItem: jest.fn().mockImplementation((key) => mockStore[key] || null),
  setItem: jest.fn().mockImplementation((key, value) => (mockStore[key] = value)),
  removeItem: jest.fn().mockImplementation((key) => delete mockStore[key]),
}

describe('use-local-storage', () => {
  describe('setPreviousSearchDataToLocalStorage', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
      })
    })
    afterEach(() => {
      mockStore = {}
    })

    it('should set a key on localStorage that stores an object containing the data passed in as args + an expiry value', () => {
      const mockData = {
        someField: 'someValue',
        someOtherField: 'someOtherValue',
      }
      const mockExpiry = { expiry: Date.now() + EXPIRY_TIME_MS }

      setPreviousSearchDataToLocalStorage(mockData)

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        PREVIOUS_SEARCH_DATA,
        JSON.stringify({ ...mockData, ...mockExpiry })
      )
    })
  })

  describe('getPreviousSearchDataFromLocalStorage', () => {
    it('should return undefined if previousSearchResults has not been previously set', () => {
      expect(getPreviousSearchDataFromLocalStorage('testField')).toEqual(undefined)
    })

    it('should return the desired value from previousSearchResults if the expiry time has not passed', () => {
      const mockData = {
        testField: 'testValue',
        expiry: Date.now(),
      }

      window.localStorage.setItem(PREVIOUS_SEARCH_DATA, JSON.stringify(mockData))
      expect(getPreviousSearchDataFromLocalStorage('testField')).toEqual(mockData)
    })

    it('should not return previousSearchResults if the expiry time has passed and data is removed from localStorage', () => {
      const mockData = {
        testField: 'testValue',
        expiry: Date.now() + EXPIRY_TIME_MS,
      }

      window.localStorage.setItem(PREVIOUS_SEARCH_DATA, JSON.stringify(mockData))

      jest.advanceTimersByTime(900007)

      expect(getPreviousSearchDataFromLocalStorage()).toEqual(undefined)
      expect(window.localStorage.getItem(PREVIOUS_SEARCH_DATA)).toEqual(null)
    })
  })
})
