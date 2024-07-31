export interface iStatisticTrafficItem {
  companyName: {
    id: number
    companyName: string
    website: string
    domainCreateDateTime: string | null
  }
  traffic: string
}

export interface iStatisticTrafficData {
  data: {
    companyNamesTraffic: iStatisticTrafficItem[]
  }
}
