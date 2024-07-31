export interface iBrokerLogItem {
  id?: number
  level?: string
  message?: string
  timestamp?: string
}

export interface iBrokerLogsData {
  data: {
    brokerLogs: iBrokerLogItem[]
    message: string
  }
}
