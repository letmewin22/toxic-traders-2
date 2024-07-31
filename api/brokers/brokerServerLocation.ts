import axiosInstance from '../axiosInstance'
import type { iServerLocationData } from '~/types/broker/brokerServerLocation'

export const getBrokerServerLocation = async (brokerId: number) => {
  try {
    const { data }: iServerLocationData = await axiosInstance.get(
      'Broker/BaseBrokerServerLocation',
      {
        params: {
          BrokerId: brokerId,
        },
      }
    )

    return data
  } catch (e) {
    if (e.response.status === 400) {
      return ''
    }
    console.error(e.message)
    throw e
  }
}

export const createBrokerServerLocation = async (
  brokerId: number,
  serverLocation: string
) => {
  try {
    const { data }: iServerLocationData = await axiosInstance.post(
      'Broker/BaseBrokerServerLocation',
      null,
      {
        params: {
          BrokerId: brokerId,
          baseBrokerServerLocation: serverLocation || '',
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const deleteBrokerServerLocation = async (brokerId: number) => {
  try {
    const { data }: iServerLocationData = await axiosInstance.delete(
      'Broker/BaseBrokerServerLocation',
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
