import axiosInstance from '../axiosInstance'
import type { iData } from '~/types'

export const getExecutionMT4 = async () => {
  try {
    const { data }: iData = await axiosInstance.get('Enum/ExecutionEnum')

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
