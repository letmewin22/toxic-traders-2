import axiosInstance from '../axiosInstance'
import type { iLogsData } from '~/types/logs'

export const getLogs = async (
  page: number,
  pageSize: number,
  sortBy: string,
  sortOrder: number
) => {
  try {
    const { data }: iLogsData = await axiosInstance.get('Log/Page', {
      params: {
        page,
        pageSize,
        sortBy,
        sortOrder,
      },
    })

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
