import axiosInstance from '../axiosInstance'
import type { iBrokerLogsData } from '~/types/broker/brokerLogs'

export const getBrokerLogs = async (brokerId: number) => {
  try {
    const { data }: iBrokerLogsData = await axiosInstance.get('Broker/Logs', {
      params: {
        brokerId,
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
