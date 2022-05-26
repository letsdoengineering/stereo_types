import { format } from 'date-fns'
import { capitalizeEachWord } from '../utils/string-helpers'

const PORT_LIST_CHAR_LIMIT = 200
const LOCATION_CODES = { SEA: 'Sea' } // Codes are either genuine codes, null, or 'Sea' for at sea days.

/** Class representing Cabin Pricing for each type of cabin within Pricing of a Cruise. */
export class CabinTypePricing {
  /**
   * @param {int} fare - is the total cabin fare for all passengers. Default is 2 people (so half the fare for price per person) it gets more complicated if request provided 3, 4 or 5 passengers.
   * @param {string} cabinType - is the type of cabin the fare is for: Inside / Outside / Balcony / Suite.
   * @param {bool} available - is a boolean to indicate if the cabin type is available. = False if fare is 0, caused by a number of scenarios - sold out being one of them.
   */
  readonly fare: number
  readonly cabinType: 'Inside' | 'Outside' | 'Balcony' | 'Suite'
  readonly available: boolean
  constructor(priceData: Record<string, any>) {
    this.fare = priceData.fare
    this.cabinType = priceData.cabinType.charAt(0) + priceData.cabinType.slice(1).toLowerCase()
    this.available = priceData.available
  }
}

/** Class representing Pricing of a cruise */
export class Pricing {
  /**
   * @param {int} taxesFaresAndPortExpenses - is the total tax fee for all passengers on booking. (Note: the value is a fixed fee per person for this cruise, its not related to fare amount).
   * @param {string}  currencyCode - is the ISO 4217 currency code the fare value is quoted in.
   * @param {array} cabinTypePricing - is an array of price details per cabin type.
   */
  readonly taxesFaresAndPortExpenses: number
  readonly currencyCode: 'GBP' | 'USD'
  readonly cabinTypePricing: CabinTypePricing[]
  constructor(pricing: Pricing) {
    this.taxesFaresAndPortExpenses = pricing.taxesFaresAndPortExpenses
    this.currencyCode = pricing.currencyCode
    this.cabinTypePricing = pricing.cabinTypePricing.map(
      (cabinTypePricing) => new CabinTypePricing(cabinTypePricing)
    )
  }
}

/** Class representing an ItineraryDay of the Itinerary array of a Cruise - used to create port list on itinerary. */
export class ItineraryDay {
  /**
   *  @param {string} locationCode - is the code for main location on that itinerary day, can be port/excursion references or undefined.
   *  @param {string} location - is the port name or the excursion day location 'StoneHenge', or other notable events locations like 'crossing equator'). Sea Days are set to empty string.
   */
  readonly location?: string
  readonly locationCode: string
  constructor(itineraryDay: Record<string, string>) {
    this.locationCode = itineraryDay.locationCode
    this.location = this.getPortName(itineraryDay.location, itineraryDay.locationCode)
  }

  getPortName(location: string | undefined, locationCode: string): string {
    return location && locationCode !== LOCATION_CODES.SEA ? location.split(',')[0] : ''
  }
}

/**  Class representing the Itinerary field of a cruise*/
export class Itinerary {
  /**
   * @param {string} portListContentFull - is a string of port names constructed using all location field from each ItineraryDays.
   * @param {string} portListContentLimited - is either empty string or as many ports before total length exceed fixed char limit when full list exceeds limit.
   */
  readonly portListContentFull: string
  readonly portListContentLimited: string
  constructor(itinerary: Record<string, string>[]) {
    this.portListContentFull = this.getFullPortListContent(itinerary)
    this.portListContentLimited =
      this.portListContentFull.length > PORT_LIST_CHAR_LIMIT
        ? this.getTruncatedPortListContent(itinerary)
        : ''
    this.getTruncatedPortListContent(itinerary)
  }

  /**
   * Get all the ports using 'location' field from each itinerary day array on a cruise itinerary and constructs as single string list.
   * @param { array }  itinerary - an array of itinerary days for a cruise, each contain location and locationCode
   * @return {string} the cruise's itinerary's ports as a string list.
   */
  getFullPortListContent(itinerary: Record<string, string>[]): string {
    const itineraryDayList = itinerary.map((itineraryDay) => new ItineraryDay(itineraryDay))
    let fullPortsList = ''

    itineraryDayList.forEach((itineraryDay: ItineraryDay) => {
      if (itineraryDay.location) {
        fullPortsList +=
          fullPortsList === '' ? itineraryDay.location : ` > ${itineraryDay.location}`
      }
    })

    return fullPortsList
  }

  /**
   * Creates the ports list again but stops adding ports when char length is exceeded.
   * @param { array }  itinerary - an array of itinerary days for a cruise, each contain location and locationCode
   * @return {string} the cruise's itinerary's ports as a string list.
   */
  getTruncatedPortListContent(itinerary: Record<string, string>[]): string {
    const itineraryList = itinerary.map((itineraryDay) => new ItineraryDay(itineraryDay))
    let trimmedPortsList = ''
    itineraryList.some((itineraryDay: ItineraryDay) => {
      if (itineraryDay.location) {
        let portString =
          trimmedPortsList === '' ? itineraryDay.location : ` > ${itineraryDay.location}`

        if ((trimmedPortsList + portString).length > PORT_LIST_CHAR_LIMIT) {
          portString = ''
          trimmedPortsList += portString
          return true // stop iterating through PortsList when char limit has been exceeded
        }
        trimmedPortsList += portString
      }
    })

    return trimmedPortsList
  }
}

/** Class representing a Cruise */
export class Cruise {
  /**
   * @param {string} cruiseLine - is the cruise line name
   * @param {int} duration: Represents the number of nights the cruise lasts
   * @param {string} generalDestination - is the (optional) general destination for the cruise
   * @param {object}  itinerary - is the itinerary for the cruise
   * @param {object}  pricing - is the pricing for the cruise
   * @param {string}  shipName - is the ship name
   * @param {string}  startDate - is the startDate of the cruise [d MMM yyyy] = "3 Jun 2023"
   * @param {string}  title - is the tile of the cruise
   */
  readonly cruiseLine: string
  readonly duration: number
  readonly generalDestination?: string
  readonly itinerary: Itinerary
  readonly pricing: Pricing
  readonly shipName: string
  readonly startDate: string
  readonly title: string
  readonly cruiseLineLogo: string
  readonly cruiseShipImage: string
  constructor(cruise: Record<string, any>) {
    this.cruiseLine = cruise.cruiseLine
    this.duration = cruise.duration
    this.generalDestination = capitalizeEachWord(cruise.generalDestination)
    this.itinerary = new Itinerary(cruise.itinerary)
    this.pricing = new Pricing(cruise.pricing)
    this.shipName = cruise.shipName
    this.startDate = format(new Date(cruise.startDate), 'd MMM yyyy')
    this.title = capitalizeEachWord(cruise.title)
    this.cruiseLineLogo = cruise.cruiseLineLogo
    this.cruiseShipImage = cruise.cruiseShipImage
  }
}
