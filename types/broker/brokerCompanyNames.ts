export interface iCompanyNamesItem {
  id: number
  companyName: string
  website: string
}

export interface iCompanyNames {
  brokerId: number
  companyNames: iCompanyNamesItem[]
}

export interface iCompanyNamesData {
  data: {
    companyNames: iCompanyNames[]
  }
}
