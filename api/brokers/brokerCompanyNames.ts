import axiosInstance from '../axiosInstance'
import type { iCompanyNamesData } from '~/types/broker/brokerCompanyNames'

export const getBrokerCompanyNames = async () => {
  try {
    const { data }: iCompanyNamesData = await axiosInstance.get(
      'Broker/CompanyNames'
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const getBrokerCompanyNamesById = async (brokerId: number) => {
  try {
    const { data }: iCompanyNamesData = await axiosInstance.get(
      `Broker/CompanyNames/${brokerId}`
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
