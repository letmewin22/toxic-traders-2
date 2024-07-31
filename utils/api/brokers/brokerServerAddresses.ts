import axiosInstance from '../axiosInstance'
import type { iServerAddressesData } from '~/types/broker/brokerServerAddresses'

export const getBrokerServerAddresses = async (brokerId: number) => {
  try {
    const { data }: iServerAddressesData = await axiosInstance.get(
      'Broker/ServerAddresses',
      {
        params: {
          brokerId,
        },
      }
    )

    return data
  } catch (e) {
    if (e.response.status === 400) {
      return { brokerServerAddresses: [] }
    }
    console.error(e.message)
    throw e
  }
}
