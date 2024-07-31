import axiosInstance from '../axiosInstance'
import type { iCategoriesData } from '~/types/broker/brokerCategories'

export const getBrokerCategories = async (brokerId: number) => {
  try {
    const { data }: iCategoriesData = await axiosInstance.get(
      'Broker/BrokerCategories',
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

export const createBrokerCategories = async (
  brokerId: number,
  category: string
) => {
  try {
    const { data }: iCategoriesData = await axiosInstance.post(
      `Broker/BrokerCategories?BrokerId=${brokerId}`,
      [category]
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const deleteBrokerCategories = async (brokerId: number) => {
  try {
    const { data }: iCategoriesData = await axiosInstance.delete(
      'Broker/BrokerCategories',
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
