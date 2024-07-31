import axiosInstance from '../axiosInstance'
import type { iStatisticTrafficData } from '~/types/broker/brokerStatisticTraffic'

export const getCurrentBrokerStatisticTraffic = async (
  providerName: string,
  brokerId: number
) => {
  try {
    const { data }: iStatisticTrafficData = await axiosInstance.get(
      `Broker/BrokerCompanyNamesStatisticTraffic/${providerName}/${brokerId}`
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
