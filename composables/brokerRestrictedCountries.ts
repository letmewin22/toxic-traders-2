import {
  createBrokerRestrictedCountries,
  deleteBrokerRestrictedCountries,
  getBrokerRestrictedCountries,
  updateBrokerRestrictedCountries,
} from '~/utils/api/brokers/brokerRestrictedCountries'

export const useBrokerRestrictedCountries = () => {
  const { addToast } = useToasts()

  const getRestrictedCountries = async (brokerId: number) => {
    try {
      const data = await getBrokerRestrictedCountries(brokerId)

      return data
    } catch (error) {
      console.error('Error fetching restricted countries:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching restricted countries. Please try again.',
      })
    }
  }

  const updateRestrictedCountries = async (
    brokerId: number,
    countriesItems: number[]
  ) => {
    try {
      const data = await updateBrokerRestrictedCountries(
        brokerId,
        countriesItems
      )

      return data
    } catch (error) {
      console.error('Error updating restricted countries:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while updating restricted countries. Please try again.',
      })
    }
  }

  const createRestrictedCountries = async (
    brokerId: number,
    countriesItems: number[]
  ) => {
    try {
      const { restrictedCountries } = await createBrokerRestrictedCountries(
        brokerId,
        countriesItems
      )

      return restrictedCountries
    } catch (error) {
      console.error('Error creating restricted countries:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating restricted countries. Please try again.',
      })
    }
  }

  const deleteRestrictedCountries = async (brokerId: number) => {
    try {
      const data = await deleteBrokerRestrictedCountries(brokerId)

      return data
    } catch (error) {
      console.error('Error deleting restricted countries:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while deleting restricted countries. Please try again.',
      })
    }
  }

  return {
    getRestrictedCountries,
    updateRestrictedCountries,
    createRestrictedCountries,
    deleteRestrictedCountries,
  }
}
