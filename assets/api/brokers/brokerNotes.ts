import axiosInstance from '../axiosInstance'
import type { iNotesData } from '~/types/broker/brokerNotes'

export const getBrokerNotes = async (brokerId: number) => {
  try {
    const { data }: iNotesData = await axiosInstance.get('Broker/Notes', {
      params: {
        BrokerId: brokerId,
      },
    })

    return data
  } catch (e) {
    if (e.response.status !== 400) {
      console.error(e.message)
      throw e
    }
  }
}

export const updateBrokerNotes = async (brokerId: number, Notes: string) => {
  try {
    const { data }: iNotesData = await axiosInstance.put(`Broker/Notes`, null, {
      params: {
        BrokerId: brokerId,
        Notes: Notes || '',
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const createBrokerNotes = async (brokerId: number, notes: string) => {
  try {
    const { data }: iNotesData = await axiosInstance.post('Broker/Notes', {
      params: {
        BrokerId: brokerId,
        notes,
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const deleteBrokerNotes = async (brokerId: number) => {
  try {
    const { data }: iNotesData = await axiosInstance.delete('Broker/Notes', {
      params: {
        BrokerId: brokerId,
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
