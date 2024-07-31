import axiosInstance from '../axiosInstance'
import type { iData } from '~/types'

export const getFillPolicyList = async () => {
  try {
    const { data }: iData = await axiosInstance.get('Enum/FillPolicyEnum')

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
