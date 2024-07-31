import axiosInstance from '../axiosInstance'
import type { iBrokerServerData } from '~/types/broker/brokerServer'

export const getBrokerServer = async (brokerId: number) => {
  try {
    const { data }: iBrokerServerData = await axiosInstance.get(
      'BrokerServer/BrokerServer',
      {
        params: {
          BrokerId: brokerId,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const getBrokerServerById = async (serverId: number) => {
  try {
    const data: iBrokerServerData = await axiosInstance.get(
      `BrokerServer/${serverId}`
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
