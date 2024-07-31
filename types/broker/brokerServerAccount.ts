import type { iBrokerServer } from './brokerServer'

export interface iBrokerServerAccountData {
  data: {
    brokerServers: iBrokerServer[]
    message: string
  }
}
