import axiosInstance from '../axiosInstance'
import type { iRestrictedCountriesListData } from '~/types/broker/brokerRestrictedCountries'

export const getBrokerRestrictedCountriesList = async () => {
  try {
    const { data }: iRestrictedCountriesListData = await axiosInstance.get(
      'Broker/BrokerRestrictedCountriesEnum'
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
