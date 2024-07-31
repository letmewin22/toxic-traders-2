import axiosInstance from '../axiosInstance'
import type { iBrokerServerAccountNotesData } from '~/types/broker/brokerServerAccountNotes'

export const getBrokerServerAccountNotes = async (serverAccountId: number) => {
  try {
    const { data }: iBrokerServerAccountNotesData = await axiosInstance.get(
      'BrokerServerAccount/Notes',
      {
        params: {
          BrokerServerAccountId: serverAccountId,
        },
      }
    )

    return data
  } catch (e) {
    if (e.response.status !== 400) {
      console.error(e.message)
      throw e
    }
  }
}

export const updateBrokerServerAccountNotes = async (
  serverAccountId: number,
  notes: string
) => {
  try {
    const { data }: iBrokerServerAccountNotesData = await axiosInstance.put(
      'BrokerServerAccount/Notes',
      null,
      {
        params: {
          BrokerServerAccountId: serverAccountId,
          Notes: notes || '',
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const deleteBrokerServerAccountNotes = async (
  serverAccountId: number
) => {
  try {
    const { data }: iBrokerServerAccountNotesData = await axiosInstance.delete(
      'BrokerServerAccount/Notes',
      {
        params: {
          BrokerServerAccountId: serverAccountId,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
