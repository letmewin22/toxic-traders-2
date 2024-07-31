import {
  createBrokerCategories,
  deleteBrokerCategories,
  getBrokerCategories,
} from '~/utils/api/brokers/brokerCategories'
import { getBrokerCategoriesList } from '~/utils/api/brokers/brokerCategoriesList'

export const useBrokerCategories = () => {
  const { addToast } = useToasts()

  const getCategoriesList = async () => {
    try {
      const data = await getBrokerCategoriesList()
      return data
    } catch (error) {
      console.error('Error fetching categories:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while fetching categories. Please try again.',
      })
    }
  }

  const getCategories = async (brokerId: number) => {
    try {
      const { brokerCategories } = await getBrokerCategories(brokerId)

      return brokerCategories?.map(categoryData => categoryData.category)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const createCategories = async (brokerId: number, category: string) => {
    try {
      const { brokerCategories } = await createBrokerCategories(
        brokerId,
        category
      )

      return brokerCategories
    } catch (error) {
      console.error('Error creating categories:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while creating categories. Please try again.',
      })
    }
  }

  const deleteCategories = async (brokerId: number) => {
    try {
      const data = await deleteBrokerCategories(brokerId)

      addToast({
        color: ToastColor.success,
        text: 'Category successfully deleted.',
      })

      return data
    } catch (error) {
      console.error('Error deleting categories:', error)
      addToast({
        color: ToastColor.danger,
        text: 'An error occurred while deleting categories. Please try again.',
      })
    }
  }

  return {
    getCategoriesList,
    getCategories,
    createCategories,
    deleteCategories,
  }
}
