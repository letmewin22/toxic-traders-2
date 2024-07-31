import axiosInstance from '../axiosInstance'
import type { iBrokerServerPostRes } from '~/types/broker/brokerServer'

export const createBrokerServerAccount = async (
  accountType: string,
  login: string,
  password: string,
  brokerServerId: number
) => {
  try {
    const { data }: iBrokerServerPostRes = await axiosInstance.post(
      'BrokerServerAccount',
      null,
      {
        params: {
          AccountType: accountType,
          Login: login,
          Password: password,
          BrokerServerId: brokerServerId,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const updateBrokerServerAccount = async (
  brokerServerAccountId: number,
  accountType: string,
  login: string,
  password: string
) => {
  try {
    const { data } = await axiosInstance.put('BrokerServerAccount', null, {
      params: {
        BrokerServerAccountId: brokerServerAccountId,
        AccountType: accountType,
        Login: login,
        Password: password,
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const deleteBrokerServerAccount = async (
  brokerServerAccountId: number
) => {
  try {
    const { data } = await axiosInstance.delete('BrokerServerAccount', {
      params: {
        BrokerServerAccountId: brokerServerAccountId,
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
