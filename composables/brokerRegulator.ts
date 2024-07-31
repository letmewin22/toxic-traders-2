import {
  createBrokerRegulator,
  deleteBrokerRegulator,
  getBrokerRegulator,
  updateBrokerRegulator,
} from '~/utils/api/brokers/brokerRegulator'
import type { iRegulatorItem } from '~/types/broker/brokerRegulator'

export const useBrokerRegulator = () => {
  const { addToast } = useToasts()

  const getRegulator = async (brokerId: number) => {
    try {
      const { regulators } = await getBrokerRegulator(brokerId)

      return regulators
    } catch (error) {
      console.error('Error fetching regulator:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching regulator. Please try again.',
      })
    }
  }

  const updateRegulator = async (
    brokerId: number,
    regulator: iRegulatorItem[]
  ) => {
    try {
      const { regulators } = await updateBrokerRegulator(brokerId, regulator)

      addToast({
        color: ToastColor.success,
        text: 'Regulator successfully updated.',
      })

      return regulators
    } catch (error) {
      console.error('Error updating regulator:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while updating regulator. Please try again.',
      })
    }
  }

  const createRegulator = async (brokerId: number) => {
    try {
      const data = await createBrokerRegulator(brokerId)

      addToast({
        color: ToastColor.success,
        text: 'Regulator successfully created.',
      })

      return data
    } catch (error) {
      console.error('Error creating regulator:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating regulator. Please try again.',
      })
    }
  }

  const deleteRegulator = async (brokerId: number) => {
    try {
      const data = await deleteBrokerRegulator(brokerId)

      addToast({
        color: ToastColor.success,
        text: 'Regulator successfully deleted.',
      })

      return data
    } catch (error) {
      console.error('Error deleting regulator:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while deleting regulator. Please try again.',
      })
    }
  }

  return { getRegulator, updateRegulator, createRegulator, deleteRegulator }
}
