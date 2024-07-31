export interface iBrokerServerAccountSymbolMT5CommissionInfoCommission {
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
  brokerServerAccountSymbolMT5CommissionsInfoCommission: iBrokerServerAccountSymbolMT5CommissionInfoCommission[]
}

export interface iBrokerServerAccountSymbolMT5 {
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

export interface iBrokerServerAccountSymbolMT4 {
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

export interface iBrokerServerAccountOrder {
  login: string
  openTime: string
  ticket: number
  type: number
  comment: string
}

export interface iBrokerServerAccountLoginHistory {
  login: string
  password: string
}

export interface iBrokerServerAccount {
  id: number
  accountType: string
  login: string
  password: string
  notes: string
  brokerLeverage: number
  brokerServerTimeZone: number
  brokerServerAccountLoginHistory: iBrokerServerAccountLoginHistory[]
  brokerServerAccountOrders: iBrokerServerAccountOrder[]
  brokerServerAccountSymbolsMT5: iBrokerServerAccountSymbolMT5[]
  brokerServerAccountSymbolsMT4: iBrokerServerAccountSymbolMT4[]
  serverId: number
}

export interface iBrokerServerIPAddress {
  ipAddress: string
}

export interface iBrokerServer {
  id: number
  serverName: string
  clusterName: string
  serverType: number
  brokerServerAccounts: iBrokerServerAccount[]
  brokerServerIPAddresses: iBrokerServerIPAddress[]
}

export interface iBrokerServerData {
  data: {
    brokerServers: iBrokerServer[]
    message: string
  }
}

export interface iBrokerServerPostRes {
  data: {
    id: number
    message: string
  }
}
