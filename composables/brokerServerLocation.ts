import {
  createBrokerServerLocation,
  deleteBrokerServerLocation,
  getBrokerServerLocation,
} from '~/api/brokers/brokerServerLocation'

export const useBrokerServerLocation = () => {
  const { addToast } = useToasts()

  const getServerLocation = async (brokerId: number) => {
    try {
      const data = await getBrokerServerLocation(brokerId)

      return data
    } catch (error) {
      console.error('Error fetching server location:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server location. Please try again.',
      })
    }
  }

  const createServerLocation = async (
    brokerId: number,
    serverLocation: string
  ) => {
    try {
      const data = await createBrokerServerLocation(brokerId, serverLocation)

      return data
    } catch (error) {
      console.error('Error creating server location:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating server location. Please try again.',
      })
    }
  }

  const deleteServerLocation = async (brokerId: number) => {
    try {
      const data = await deleteBrokerServerLocation(brokerId)

      return data
    } catch (error) {
      console.error('Error deleting server location:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while deleting server location. Please try again.',
      })
    }
  }

  return {
    getServerLocation,
    createServerLocation,
    deleteServerLocation,
  }
}
