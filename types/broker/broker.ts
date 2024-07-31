import type { iSearchInput } from '..'

export interface iBroker {
  baseBrokerServerLocation?: string | null
  brokerCategories?: string | null
  brokerDepositMethods?: string | null
  brokerLeverage?: string | null
  brokerPlatforms?: string | null
  brokerReviewsForexPeaceArmyRating?: string | null
  brokerReviewsForexPeaceArmyReviewsCount?: string | null
  brokerReviewsFx123Rating?: string | null
  brokerReviewsFx123ReviewsCount?: string | null
  brokerReviewsTrustPilotRating?: string | null
  brokerReviewsTrustPilotReviewsCount?: string | null
  brokerReviewsWikifxRating?: string | null
  brokerReviewsWikifxReviewsCount?: string | null
  brokerServerTimezone?: string | null
  brokerServersMT4ServerNames?: string | null
  brokerServersMT5ServerNames?: string | null
  companyNames?: string | null
  createdDate?: string | null
  regulatorName?: string | null
  restrictedCountries?: string | null
  website?: string | null
  id?: number | null
}

export interface iBrokersData {
  data: {
    brokers: iBroker[]
    totalCount: number
  }
}

export interface iBrokerData {
  data: iBroker
}

// export type iBrokerData = iBroker

export interface IBrokerSearchParams {
  offset: number
  count: number
  sortOrder: number
  sortBy: string
  data: iSearchInput[]
}

export interface iSearchBrokerParams {
  searchResultPage: number
  searchResultPageSize: number
  sortBy: string
  sortOrder: number
  companyName: string
  category: string
  locationServers: string
  addressCompany: string
  website: string
  serverType: number
  regulator: number
  platforms: number
  depositMethods: number
  leverage: number
  serverTimezone: number
  symbolName: string
  description: string
  digits: number
  contractSize: number
  fillPolicy: number
  executionType: number
  execution: number
}
