import axiosInstance from '../axiosInstance'
import type { iBrokerData } from '~/types/broker/broker'

export const getBrokerById = async (brokerId: number) => {
  try {
    const { data }: iBrokerData = await axiosInstance.get(`Broker/${brokerId}`)

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
