import axiosInstance from '../axiosInstance'
import type { iRestrictedCountriesData } from '~/types/broker/brokerRestrictedCountries'

export const getBrokerRestrictedCountries = async (brokerId: number) => {
  try {
    const { data }: iRestrictedCountriesData = await axiosInstance.get(
      'Broker/RestrictedCountries',
      {
        params: {
          BrokerId: brokerId,
        },
      }
    )

    return data
  } catch (e) {
    if (e.response.status === 400) {
      return { restrictedCountries: [] }
    }
    console.error(e.message)
    throw e
  }
}

export const createBrokerRestrictedCountries = async (
  brokerId: number,
  countriesItems: number[]
) => {
  try {
    const { data }: iRestrictedCountriesData = await axiosInstance.post(
      'Broker/RestrictedCountries',
      countriesItems,
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

export const updateBrokerRestrictedCountries = async (
  brokerId: number,
  countriesItems: number[]
) => {
  try {
    const { data }: iRestrictedCountriesData = await axiosInstance.put(
      'Broker/RestrictedCountries',
      countriesItems,
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

export const deleteBrokerRestrictedCountries = async (brokerId: number) => {
  try {
    const { data }: iRestrictedCountriesData = await axiosInstance.delete(
      'Broker/RestrictedCountries',
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
