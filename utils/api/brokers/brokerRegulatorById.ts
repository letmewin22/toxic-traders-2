import axiosInstance from '../axiosInstance'
import type { iRegulatorData } from '~/types/broker/brokerRegulator'

export const getBrokerRegulatorById = async (regulatorId: number) => {
  try {
    const { data }: iRegulatorData = await axiosInstance.get(
      `Broker/Regulator/${regulatorId}`
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
