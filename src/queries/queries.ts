import { gql } from '@apollo/client'

export const GET_CRUISES = gql`
    query Cruises(
        $departureEnd: Date
        $departureStart: Date
        $destination: String
        $durationMax: Int
        $durationMin: Int
        $supplier: String
        $ship: String
        $portOfDeparture: String
        $voyageCode: String
    ) {
        getCruises(
            departureEnd: $departureEnd
            departureStart: $departureStart
            destination: $destination
            durationMax: $durationMax
            durationMin: $durationMin
            supplier: $supplier
            ship: $ship
            portOfDeparture: $portOfDeparture
            voyageCode: $voyageCode
        ) {
            cruiseLine
            duration
            endDate
            generalDestination
            itinerary {
                additionalInformation
                arrivalDate
                arrivalTime
                dayNumber
                dayType
                departureDate
                departureTime
                geoCode
                location
                locationCode
            }
            productType
            shipName
            startDate
            title
            voyageCode
            pricing {
                cabinTypePricing {
                    fare
                    cabinType
                    available
                }
                taxesFaresAndPortExpenses
                currencyCode
            }
            cruiseLineLogo
            cruiseShipImage
        }
    }
`

export const GET_LOCATIONS_BY_SUBSTRING = gql`
    query Locations($substring: String!, $size: Int!) {
        getLocationsBySubstring(substring: $substring, size: $size) {
            name
            category
        }
    }
`
