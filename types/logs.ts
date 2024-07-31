export interface iLogItem {
  id?: number
  level?: string
  message?: string
  timestamp?: string
}

export interface iLogsData {
  data: {
    logs: iLogItem[]
    totalCount: number
    message: string
  }
}
