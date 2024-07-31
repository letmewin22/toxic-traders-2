import axiosInstance from '../axiosInstance'
import type { iDepositMethodsData } from '~/types/broker/brokerDepositMethods'

export const getBrokerDepositMethods = async (brokerId: number) => {
  try {
    const { data }: iDepositMethodsData = await axiosInstance.get(
      'Broker/DepositMethods',
      {
        params: {
          BrokerId: brokerId,
        },
      }
    )

    return data
  } catch (e) {
    if (e.response.status === 400) {
      return { depositMethods: [] }
    }
    console.error(e.message)
    throw e
  }
}

export const updateBrokerDepositMethods = async (
  brokerId: number,
  depositItems: number[]
) => {
  try {
    const { data }: iDepositMethodsData = await axiosInstance.put(
      'Broker/DepositMethods',
      depositItems,
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

export const createBrokerDepositMethods = async (
  brokerId: number,
  depositItems: number[]
) => {
  try {
    const { data }: iDepositMethodsData = await axiosInstance.post(
      'Broker/DepositMethods',
      depositItems,
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

export const deleteBrokerDepositMethods = async (brokerId: number) => {
  try {
    const { data }: iDepositMethodsData = await axiosInstance.delete(
      'Broker/DepositMethods',
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
