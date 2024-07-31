import {
  deleteBrokerServerAccountNotes,
  getBrokerServerAccountNotes,
  updateBrokerServerAccountNotes,
} from '~/api/brokers/brokerServerAccountNotes'

export const useBrokerServerAccountNotes = () => {
  const { addToast } = useToasts()

  const getBrokerAccountNotes = async (serverAccountId: number) => {
    try {
      const data = await getBrokerServerAccountNotes(serverAccountId)

      return data
    } catch (error) {
      console.error('Error fetching broker server account notes:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching broker server account notes. Please try again.',
      })
    }
  }

  const updateBrokerAccountNotes = async (
    serverAccountId: number,
    notes: string
  ) => {
    try {
      const data = await updateBrokerServerAccountNotes(serverAccountId, notes)

      addToast({
        color: ToastColor.success,
        text: 'Account notes successfully updated.',
      })

      return data
    } catch (error) {
      console.error('Error updating broker server account notes:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while updating broker server account notes. Please try again.',
      })
    }
  }

  const deleteBrokerAccountNotes = async (serverAccountId: number) => {
    try {
      const data = await deleteBrokerServerAccountNotes(serverAccountId)

      addToast({
        color: ToastColor.success,
        text: 'Account notes successfully deleted.',
      })

      return data
    } catch (error) {
      console.error('Error deleting broker server account notes:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while deleting broker server account notes. Please try again.',
      })
    }
  }

  return {
    getBrokerAccountNotes,
    updateBrokerAccountNotes,
    deleteBrokerAccountNotes,
  }
}
