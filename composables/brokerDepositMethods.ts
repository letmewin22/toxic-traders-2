import {
  createBrokerDepositMethods,
  deleteBrokerDepositMethods,
  getBrokerDepositMethods,
  updateBrokerDepositMethods,
} from '~/utils/api/brokers/brokerDepositMethods'

export const useBrokerDepositMethods = () => {
  const { addToast } = useToasts()

  const getDepositMethods = async (brokerId: number) => {
    try {
      const data = await getBrokerDepositMethods(brokerId)

      return data
    } catch (error) {
      console.error('Error fetching deposit methods:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching deposit methods. Please try again.',
      })
    }
  }

  const updateDepositMethods = async (
    brokerId: number,
    depositItems: number[]
  ) => {
    try {
      const data = await updateBrokerDepositMethods(brokerId, depositItems)

      return data
    } catch (error) {
      console.error('Error updating deposit methods:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while updating deposit methods. Please try again.',
      })
    }
  }

  const createDepositMethods = async (
    brokerId: number,
    depositItems: number[]
  ) => {
    try {
      const { depositMethods } = await createBrokerDepositMethods(
        brokerId,
        depositItems
      )

      return depositMethods
    } catch (error) {
      console.error('Error creating deposit methods:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating deposit methods. Please try again.',
      })
    }
  }

  const deleteDepositMethods = async (brokerId: number) => {
    try {
      const data = await deleteBrokerDepositMethods(brokerId)

      return data
    } catch (error) {
      console.error('Error deleting deposit methods:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while deleting deposit methods. Please try again.',
      })
    }
  }

  return {
    getDepositMethods,
    updateDepositMethods,
    createDepositMethods,
    deleteDepositMethods,
  }
}
