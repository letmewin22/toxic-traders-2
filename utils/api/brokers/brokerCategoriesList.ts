import axiosInstance from '../axiosInstance'
import type { iCategoriesList } from '~/types/broker/brokerCategories'

export const getBrokerCategoriesList = async () => {
  try {
    const { data }: iCategoriesList = await axiosInstance.get(
      'Broker/BrokerCategoriesList'
    )

    return data.uniqueBrokerCategories
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
