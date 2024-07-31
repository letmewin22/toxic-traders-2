import axiosInstance from '../axiosInstance'
import type {
  iBrokerRunSpreadMeasurements,
  iBrokerRunSpreadMeasurementsData,
} from '~/types/broker/brokerRunSpreadMeasurements'

export const createBrokerRunSpreadMeasurements = async (
  params: iBrokerRunSpreadMeasurements
) => {
  try {
    const { data }: iBrokerRunSpreadMeasurementsData = await axiosInstance.post(
      'Broker/RunSpreadMeasurements',
      null,
      {
        params: {
          symbolId: params?.symbolId,
          serverType: params?.serverType,
          symbolName: params?.symbolName,
          timeLengthSec: params?.timeLengthSec,
          startDateTime: params?.startDateTime,
          SpreadOrNewsSpread: params?.SpreadOrNewsSpread,
        },
      }
    )

    return data
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
