export interface iBrokerServerAccountSymbolMT5CommissionsInfoCommission {
  unitType: number
  unitMode: number
  unitValue: number
  minValue: number
  maxValue: number
  minUnit: number
  currencyUnit: string
  maxUnit: number
}

export interface iBrokerServerAccountSymbolMT5CommissionsInfo {
  instantCommissionType: number
  commissionPeriod: number
  commissionType: number
  brokerServerAccountSymbolMT5CommissionsInfoCommission: iBrokerServerAccountSymbolMT5CommissionsInfoCommission[]
}

export interface iBrokerServerAccountSymbolsMT5 {
  id: number
  marginCurrency: string
  calcMode: number
  precision: number
  points: number
  depthOfMarket: number
  gtcMode: number
  isin: string
  tickSize: number
  currency: string
  contractSize: number
  digits: number
  description: string
  initialMargin: number
  executionType: number
  swapType: number
  swapLong: number
  swapShort: number
  threeDaysSwap: number
  tp: number
  sl: number
  fillPolicy: number
  lotsStep: number
  maxLots: number
  minLots: number
  groupName: string
  tradeMode: number
  brokerServerAccountSymbolMT5CommissionsInfo: iBrokerServerAccountSymbolMT5CommissionsInfo[]
  spread: number
  newsSpread: number
}

export interface iBrokerServerAccountSymbolsMT4 {
  id: number
  contractSize: number
  digits: number
  tickSize: number
  freezeLevel: number
  point: number
  stopsLevel: number
  swapLong: number
  swapShort: number
  marginCurrency: string
  execution: number
  tradeMode: number
  profitMode: number
  marginMode: number
  symbol: string
  description: string
  margin_hedged: number
  margin_maintenance: number
  margin_divider: number
  margin_initial: number
  minLot: number
  maxLot: number
  lotStep: number
  groupName: string
  spread: number
  newsSpread: number
}

export interface iBrokerServerAccountTable {
  currency: string
  description: string
  schedule: string
  digits: number
  contractSize: number
  minLots: number
  maxLots: number
  spread: number
  newsSpread: number
  tickSize: number
  commision: number
  id: number
  lotsStep: number
  tradeMode: string
  fillPolicy: string
  isin: string
}

export interface iBrokerServerAccountSymbolsSpread {
  id: number
  spread: number
  newsSpread: number
  brokerCompanyNames: string[]
  accountType: string
  brokerPlatforms: number[]
  symbolName: string
  serverType: number
}

export interface iBrokerUniqueServerAccountSymbolsSpread {
  broker: string
  accountType: string
  serverType: string
  spread: number
  newsSpread: number
}

export interface iBrokerServerAccountSymbolsSpreadsParams {
  symbolName: string
  description: string
  page: number
  pageSize: number
  sortBy: string
  sortOrder: number
}

export interface iBrokerServerAccountSymbolsSpreadsAllParams {
  page: number
  pageSize: number
  sortBy: string
  sortOrder: number
}

export interface iBrokerServerAccountSymbolsSpreadsCurrent {
  symbolName: string
  serverType?: number
  description: string
  page: number
  pageSize: number
  sortBy?: string
  sortOrder: number
}

export interface iBrokerServerAccountSymbolsMT5Data {
  data: iBrokerServerAccountSymbolsMT5[]
}

export interface iBrokerServerAccountSymbolsMT4Data {
  data: iBrokerServerAccountSymbolsMT4[]
}

export interface iBrokerServerAccountSymbolsSpreadsData {
  data: {
    brokerServerAccountSymbols: iBrokerServerAccountSymbolsSpread[]
    totalCount: number
  }
}

export interface iBrokerServerAccountSymbolsNamesData {
  data: string[]
}

export interface iBrokerServerAccountSymbolsSpreadsSchedule {
  spreadType: string
  scheduledAt: string
  length: number
}

export interface iBrokerServerAccountSymbolsSpreadsScheduleParams {
  symbolId: number
  serverType: number
}

export interface iBrokerServerAccountSymbolsSpreadsScheduleData {
  data: iBrokerServerAccountSymbolsSpreadsSchedule[]
}
