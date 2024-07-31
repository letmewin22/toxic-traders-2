export interface iBrokerCompanyName {
  id: number
  companyName: string
  website: string
  domainCreateDateTime: string | null
}

export interface iTrafficHistory {
  date: string
  organic: number
}

export interface iTopCountry {
  country: string
  share: number
}

export interface iBrokerCompanyNameStatisticAhrefs {
  trafficHistory: string
  trafficMonthlyAvg: string
  trafficMonthlyCost: string
  topCountries: string
  id: number
  parsingTimestamp: string
  webSite: string
  brokerCompanyNameId: number
  brokerCompanyName: iBrokerCompanyName
  provider?: string
}

export interface iIdentifier {
  uuid: string
}

export interface iLocationIdentifier extends iIdentifier {
  value: string
  permalink: string
  entity_def_id: string
}

export interface iLocation {
  identifier: iIdentifier
  visits_mom_pct: number | null
  uuid: string
  rank: number
  rank_mom_pct: number | null
  location_identifiers: iLocationIdentifier[]
  visits_pct: number
}

export interface iBrokerCompanyNameStatisticSemrush {
  organicSearchTraffic: string
  globalRank: number
  locationList: string
  lastUpdated: string
  id: number
  parsingTimestamp: string
  webSite: string
  brokerCompanyNameId: number
  brokerCompanyName: iBrokerCompanyName
  provider?: string
}

export interface iEngagements {
  Month: string
  Year: string
  Visits: string
}

export interface iCountryRank {
  Country: number
  CountryCode: string
  Rank: number
}

export interface iCategoryRank {
  Rank: string
  Category: string
}

export interface iTopCountryShare {
  Country: number
  CountryCode: string
  Value: number
}

export interface iBrokerCompanyNameStatisticSimilarWeb {
  engagments: string
  engagmentsVisists: string
  estimatedMonthlyVisits: string
  globalRank: number
  countryRank: string
  categoryRank: string
  globalCategoryRank: string | null
  topCountryShares: string
  lastUpdated: string
  id: number
  parsingTimestamp: string
  webSite: string
  brokerCompanyNameId: number
  brokerCompanyName: iBrokerCompanyName
  provider?: string
}

export interface iStatisticCurrentProviderData {
  data: {
    brokerCompanyNameStatistic:
      | iBrokerCompanyNameStatisticAhrefs[]
      | iBrokerCompanyNameStatisticSemrush[]
      | iBrokerCompanyNameStatisticSimilarWeb[]
  }
}

export interface iStatisticProviderData {
  data: {
    providerNames: string[]
  }
}
