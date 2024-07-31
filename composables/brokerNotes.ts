import {
  createBrokerNotes,
  deleteBrokerNotes,
  getBrokerNotes,
  updateBrokerNotes,
} from '~/api/brokers/brokerNotes'

export const useBrokerNotes = () => {
  const { addToast } = useToasts()

  const getNotes = async (brokerId: number) => {
    try {
      const data = await getBrokerNotes(brokerId)

      return data
    } catch (error) {
      console.error('Error fetching notes:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching notes. Please try again.',
      })
    }
  }

  const updateNotes = async (brokerId: number, notes: string) => {
    try {
      const data = await updateBrokerNotes(brokerId, notes)

      addToast({
        color: ToastColor.success,
        text: 'Notes successfully updated.',
      })

      return data
    } catch (error) {
      console.error('Error updating notes:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while updating notes. Please try again.',
      })
    }
  }

  const createNotes = async (brokerId: number, notes: string) => {
    try {
      const data = await createBrokerNotes(brokerId, notes)

      addToast({
        color: ToastColor.success,
        text: 'Notes successfully created.',
      })

      return data
    } catch (error) {
      console.error('Error creating notes:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating notes. Please try again.',
      })
    }
  }

  const deleteNotes = async (brokerId: number) => {
    try {
      const data = await deleteBrokerNotes(brokerId)

      addToast({
        color: ToastColor.success,
        text: 'Notes successfully deleted.',
      })

      return data
    } catch (error) {
      console.error('Error deleting notes:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while deleting notes. Please try again.',
      })
    }
  }

  return { getNotes, updateNotes, deleteNotes, createNotes }
}
