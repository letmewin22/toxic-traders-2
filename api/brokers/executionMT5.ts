import axiosInstance from '../axiosInstance'
import type { iData } from '~/types'

export const getExecutionMT5 = async () => {
  try {
    const { data }: iData = await axiosInstance.get('Enum/ExecutionTypeEnum')

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
