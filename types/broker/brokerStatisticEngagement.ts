export interface iBrokerStatisticEngagement {
  globalRank?: number | string
  categoryRank?: {
    Rank: string
    Category: string
  }
  countryRank?: {
    Country: string
    CountryCode: string
    Rank: number
  }
  engagmentsVisists?: string
  engagments?: {
    Month: string
    Year: string
    Visits: string
  }
  trafficMonthlyAvg?: string
  trafficMonthlyCost?: string
  organicSearchTraffic?: string
}
