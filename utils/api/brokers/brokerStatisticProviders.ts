import axiosInstance from '../axiosInstance'
import type {
  iStatisticCurrentProviderData,
  iStatisticProviderData,
} from '~/types/broker/brokerStatisticProvider'

export const getBrokerStatisticProviders = async () => {
  try {
    const { data }: iStatisticProviderData = await axiosInstance.get(
      'Broker/BrokerCompanyNamesStatisticProviders'
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}

export const getCurrentBrokerStatisticProvider = async (
  brokerCompanyNameId: number,
  providerName: string
) => {
  try {
    const { data }: iStatisticCurrentProviderData = await axiosInstance.get(
      `Broker/BrokerCompanyNameStatistic/${providerName}`,
      {
        params: {
          BrokerCompanyNameId: brokerCompanyNameId,
          ProviderName: providerName,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
