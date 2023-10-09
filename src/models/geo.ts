export interface IGeopositionRoot {
  latitude: number
  lookupSource: string
  longitude: number
  localityLanguageRequested: string
  continent: string
  continentCode: string
  countryName: string
  countryCode: string
  principalSubdivision: string
  principalSubdivisionCode: string
  city: string
  locality: string
  postcode: string
  plusCode: string
  localityInfo: ILocalityInfo
}

export interface ILocalityInfo {
  administrative: IAdministrative[]
  informative: IInformative[]
}

export interface IAdministrative {
  name: string
  description?: string
  order: number
  adminLevel: number
  isoCode?: string
  wikidataId?: string
  geonameId?: number
}

export interface IInformative {
  name: string
  description: string
  order: number
}
