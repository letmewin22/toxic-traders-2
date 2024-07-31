import axiosInstance from '../axiosInstance'
import type { iRegulatorNamesData } from '~/types/broker/brokerRegulator'

export const getBrokerRegulatorNames = async () => {
  try {
    const { data }: iRegulatorNamesData = await axiosInstance.get(
      'Enum/BrokerRegulatorNamesEnum'
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
