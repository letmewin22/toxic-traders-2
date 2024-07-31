import axiosInstance from '../axiosInstance'
import type { iPlatformsListData } from '~/types/broker/brokerPlatforms'

export const getBrokerPlatformsList = async () => {
  try {
    const { data }: iPlatformsListData = await axiosInstance.get(
      'Enum/BrokerPlatformsEnum'
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
