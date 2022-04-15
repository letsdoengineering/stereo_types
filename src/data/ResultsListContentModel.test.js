import { ItineraryDay, Itinerary, Cruise, Pricing } from './ResultsListContentModel'

const mockItineraryDay_inPort = {
    additionalInformation: 'Arrive morning, Depart afternoon',
    arrivalDate: '2022-04-23',
    arrivalTime: null,
    dayNumber: 0,
    dayType: 'DEPARTURE_DAY',
    departureDate: '2022-04-23',
    departureTime: '16:00:00',
    geoCode: null,
    location: 'Lisbon, Portugal',
    locationCode: 'LIS1',
    __typename: 'ItineraryItem',
}

const mockItineraryDay_withoutLocation = {
    additionalInformation: 'Arrive morning, Depart afternoon',
    arrivalDate: '2022-04-23',
    arrivalTime: null,
    dayNumber: 0,
    dayType: 'DEPARTURE_DAY',
    departureDate: '2022-04-23',
    departureTime: '16:00:00',
    geoCode: null,
    location: null,
    locationCode: 'LIS1',
    __typename: 'ItineraryItem',
}

const mockItineraryDay_atSea = {
    additionalInformation: 'Arrive morning, Depart afternoon',
    arrivalDate: '2022-04-23',
    arrivalTime: null,
    dayNumber: 0,
    dayType: 'DEPARTURE_DAY',
    departureDate: '2022-04-23',
    departureTime: '16:00:00',
    geoCode: null,
    location: 'At sea',
    locationCode: 'Sea',
    __typename: 'ItineraryItem',
}

const mockPricing = {
    cabinTypePricing: [
        {
            fare: 6198,
            cabinType: 'INSIDE',
            available: true,
        },
        {
            fare: 8298,
            cabinType: 'OUTSIDE',
            available: true,
        },
        {
            fare: 8298,
            cabinType: 'BALCONY',
            available: true,
        },
        {
            fare: 16398,
            cabinType: 'SUITE',
            available: true,
        },
    ],
    taxesFaresAndPortExpenses: 170,
    currencyCode: 'USD',
}

describe('Pricing', () => {
    it('should return currencyCode', () => {
        const results = new Pricing(mockPricing)
        expect(results.currencyCode).toEqual('USD')
    })
    it('should return taxesFaresAndPortExpenses', () => {
        const results = new Pricing(mockPricing)
        expect(results.taxesFaresAndPortExpenses).toEqual(170)
    })
    it('should return cabinTypePricing', () => {
        const results = new Pricing(mockPricing)
        expect(results.cabinTypePricing).toEqual([
            {
                available: true,
                cabinType: 'Inside',
                fare: 6198,
            },
            {
                available: true,
                cabinType: 'Outside',
                fare: 8298,
            },
            {
                available: true,
                cabinType: 'Balcony',
                fare: 8298,
            },
            {
                available: true,
                cabinType: 'Suite',
                fare: 16398,
            },
        ])
    })
})

describe('ItineraryDay', () => {
    it('should return just the port name under location', () => {
        const results = new ItineraryDay(mockItineraryDay_inPort)
        expect(results.location).toEqual('Lisbon')
    })

    it('should return an empty string under location when location does not exist on itineraryDay', () => {
        const results = new ItineraryDay(mockItineraryDay_withoutLocation)
        expect(results.location).toEqual('')
    })

    it('should return an empty string under location when locationCode is Sea', () => {
        const results = new ItineraryDay(mockItineraryDay_atSea)
        expect(results.location).toEqual('')
    })
})

describe('ItineraryList', () => {
    it('should have a string representing the ports in each ItineraryDay', () => {
        expect(
            new Itinerary([
                { location: 'London, Uk', locationCode: 'UK1' },
                { location: 'At sea, Atlantic', locationCode: 'Sea' },
                { location: 'Edinburgh, Asia', locationCode: 'UK2' },
            ]).portListContentFull
        ).toStrictEqual('London > Edinburgh')
    })

    it('should only produce a string representing all the ports within a character limit', () => {
        const itinerary = new Itinerary([
            { location: 'London', locationCode: 'UK1' },
            { location: 'At sea', locationCode: 'Sea' },
            { location: 'Edinburgh', locationCode: 'UK2' },
            {
                location: 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch3',
                locationCode: 'UK3',
            },
            {
                location: 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch4',
                locationCode: 'UK4',
            },
            {
                location: 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch5',
                locationCode: 'UK5',
            },
            {
                location: 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch6',
                locationCode: 'UK6',
            },
        ])
        expect(itinerary.portListContentLimited).toStrictEqual(
            'London > Edinburgh > Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch3 > Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch4'
        )
        expect(itinerary.portListContentFull).toStrictEqual(
            'London > Edinburgh > Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch3 > Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch4 > Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch5 > Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch6'
        )
    })
})

describe('Cruise', () => {
    const mockCruiseSearchResult = [
        {
            cruiseLine: 'Cunard',
            duration: 4,
            endDate: '2022-04-26',
            generalDestination: 'Japan',
            itinerary: [
                {
                    location: 'Tokyo (tours from Yokohama),  Japan',
                    locationCode: 'YOK1',
                },
                {
                    location: 'Day at Sea',
                    locationCode: 'Sea',
                },
                {
                    location: 'Day at Sea',
                    locationCode: 'Sea',
                },
                {
                    location: 'Hualien, Taiwan',
                    locationCode: 'HUN1',
                },
                {
                    location: 'Keelung, Taiwan',
                    locationCode: 'KE11',
                },
            ],
            pricing: mockPricing,
            shipName: 'Queen Elizabeth',
            startDate: '2022-04-22',
            title: 'Southern Islands',
        },
        {
            cruiseLine: 'P&O',
            duration: 1,
            endDate: '2022-04-06',
            generalDestination: 'South UK',
            itinerary: [
                {
                    location: 'Stone Henge',
                    locationCode: 'STONES1',
                },
            ],
            pricing: mockPricing,
            shipName: 'Sponge Bob',
            startDate: '2023-04-05',
            title: 'Southern UK Heritage',
        },
    ]

    it('it should create an itinerary from the cruise result given to the constructor', () => {
        expect(new Cruise(mockCruiseSearchResult[0]).itinerary).toStrictEqual(
            new Itinerary([
                {
                    location: 'Tokyo (tours from Yokohama),  Japan',
                    locationCode: 'YOK1',
                },
                {
                    location: 'Day at Sea',
                    locationCode: 'Sea',
                },
                {
                    location: 'Day at Sea',
                    locationCode: 'Sea',
                },
                {
                    location: 'Hualien, Taiwan',
                    locationCode: 'HUN1',
                },
                {
                    location: 'Keelung, Taiwan',
                    locationCode: 'KE11',
                },
            ])
        )
    })

    it('should contain field startDate in readable format', () => {
        expect(new Cruise(mockCruiseSearchResult[1]).startDate).toBe('5 Apr 2023')
    })

    it('should contain pricing type for each cabin with pricing in a readable format', () => {
        expect(new Cruise(mockCruiseSearchResult[0]).pricing).toStrictEqual(
            new Pricing(mockPricing)
        )
    })
})
