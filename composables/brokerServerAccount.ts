import {
  createBrokerServerAccount,
  deleteBrokerServerAccount,
  updateBrokerServerAccount,
} from '~/api/brokers/brokerServerAccount'

export const useBrokerServerAccount = () => {
  const { addToast } = useToasts()

  const createBrokerAccount = async (
    accountType: string,
    login: string,
    password: string,
    brokerServerId: number
  ) => {
    try {
      const data = await createBrokerServerAccount(
        accountType,
        login,
        password,
        brokerServerId
      )

      addToast({
        color: ToastColor.success,
        text: 'Account successfully created.',
      })

      return data
    } catch (error) {
      console.error('Error creating broker server account:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating broker server account. Please try again.',
      })
    }
  }

  const updateBrokerAccount = async (
    brokerServerAccountId: number,
    accountType: string,
    login: string,
    password: string
  ) => {
    try {
      const data = await updateBrokerServerAccount(
        brokerServerAccountId,
        accountType,
        login,
        password
      )

      addToast({
        color: ToastColor.success,
        text: 'Account successfully updated.',
      })

      return data
    } catch (error) {
      console.error('Error updating broker server account:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while updating server account. Please try again.',
      })
    }
  }

  const deleteBrokerAccount = async (brokerServerId: number) => {
    try {
      const data = await deleteBrokerServerAccount(brokerServerId)

      addToast({
        color: ToastColor.success,
        text: 'Account successfully deleted.',
      })

      return data
    } catch (error) {
      console.error('Error deleting broker server account:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while deleting broker server account. Please try again.',
      })
    }
  }

  return { createBrokerAccount, updateBrokerAccount, deleteBrokerAccount }
}
