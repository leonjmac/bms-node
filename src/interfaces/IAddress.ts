// ISO 19160-1:2015 Address Schema
export interface IAddress {
  // The name of the location
  name?: string
  // The number of the building
  number?: string
  // The type of the building
  type?: string
  // The name of the street
  street?: string
  // The type of the street
  streetType?: string
  // The name of the locality
  locality?: string
  // The name of the post town
  town?: string
  // The name of the administrative area
  county?: string
  // The name of the region
  region?: string
  // The name of the country
  country?: string
  // The postal code
  postalCode?: string
  // The geographic coordinates
  coordinates?: {
    latitude: number
    longitude: number
  }
  // ISO 3166-1 alpha-2 country code
  countryCode?: string
  // Default address on file
  default?: boolean
}