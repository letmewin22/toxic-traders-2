import { getBrokerServerAddresses } from '~/utils/api/brokers/brokerServerAddresses'

export const useBrokerServerAddresses = () => {
  const { addToast } = useToasts()

  const getServerAddresses = async (brokerId: number) => {
    try {
      const { brokerServerAddresses } = await getBrokerServerAddresses(brokerId)

      return brokerServerAddresses
    } catch (error) {
      console.error('Error fetching server addresses:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching server addresses. Please try again.',
      })
    }
  }

  return { getServerAddresses }
}
