import axiosInstance from '../axiosInstance'
import type { iBrokersData, iSearchBrokerParams } from '~/types/broker/broker'

export const getBroker = async (offset: number, count: number) => {
  try {
    const { data }: iBrokersData = await axiosInstance.get('Broker/Page', {
      params: {
        page: offset,
        pageSize: count,
        sortOrder: 1,
        sortBy: 'companyNames',
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const getSearchBroker = async (params: iSearchBrokerParams) => {
  try {
    const { data }: iBrokersData = await axiosInstance.get(
      'Broker/Search/Page',
      {
        params,
      }
    )
    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
