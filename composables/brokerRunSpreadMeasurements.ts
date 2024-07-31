import { createBrokerRunSpreadMeasurements } from '~/utils/api/brokers/brokerRunSpreadMeasurements'
import type { iBrokerRunSpreadMeasurements } from '~/types/broker/brokerRunSpreadMeasurements'

export const useBrokerRunSpreadMeasurements = () => {
  const { addToast } = useToasts()

  const createRunSpreadMeasurements = async (
    params: iBrokerRunSpreadMeasurements
  ) => {
    try {
      const data = await createBrokerRunSpreadMeasurements(params)

      addToast({
        color: ToastColor.success,
        text: 'Run spread measurement successfully created.',
      })

      return data
    } catch (error) {
      console.error('Error creating run spread measurement:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating run spread measurement. Please try again.',
      })
    }
  }

  return { createRunSpreadMeasurements }
}
