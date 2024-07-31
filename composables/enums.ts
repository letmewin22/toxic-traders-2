import { getBrokerDepositMethodsList } from '~/utils/api/brokers/brokerDepositMethodsList'
import { getBrokerPlatformsList } from '~/utils/api/brokers/brokerPlatformsList'
import { getBrokerRegulatorNames } from '~/utils/api/brokers/brokerRegulatorNames'
import { getExecutionMT4 } from '~/utils/api/brokers/executionMT4'
import { getExecutionMT5 } from '~/utils/api/brokers/executionMT5'
import { getFillPolicyList } from '~/utils/api/brokers/fillPolicy'

export const useEnums = () => {
  const platforms = useState('platforms', () => [])
  const depositMethods = useState('depositMethods', () => [])
  const regulators = useState('regulators', () => [])
  const fillPolicy = useState('fillPolicy', () => [])
  const executionMT4 = useState('executionMT4', () => [])
  const executionMT5 = useState('executionMT5', () => [])

  const getPlatformEnum = async () => {
    if (platforms.value.length) return platforms.value
    const data = await getBrokerPlatformsList()

    platforms.value = Object.values(data)
    return platforms.value
  }

  const getDepositMethodsEnum = async () => {
    if (depositMethods.value.length) return depositMethods.value
    const data = await getBrokerDepositMethodsList()

    depositMethods.value = Object.values(data)
    return depositMethods.value
  }

  const getRegulatorsEnum = async () => {
    if (regulators.value.length) return regulators.value
    const data = await getBrokerRegulatorNames()

    regulators.value = Object.values(data)
    return regulators.value
  }

  const getFillPolicyEnum = async () => {
    if (fillPolicy.value.length) return fillPolicy.value
    const data = await getFillPolicyList()

    fillPolicy.value = Object.values(data)
    return fillPolicy.value
  }

  const getExecutionMT4Enum = async () => {
    if (executionMT4.value.length) return executionMT4.value
    const data = await getExecutionMT4()

    executionMT4.value = Object.values(data)
    return executionMT4.value
  }

  const getExecutionMT5Enum = async () => {
    if (executionMT5.value.length) return executionMT5.value
    const data = await getExecutionMT5()

    executionMT5.value = Object.values(data)
    return executionMT5.value
  }

  const getAllEnums = async () => {
    await Promise.all([
      getPlatformEnum(),
      getDepositMethodsEnum(),
      getRegulatorsEnum(),
      getFillPolicyEnum(),
      getExecutionMT4Enum(),
      getExecutionMT5Enum(),
    ])

    return {
      platforms: platforms.value,
      depositMethods: depositMethods.value,
      regulators: regulators.value,
      fillPolicy: fillPolicy.value,
      executionMT4: executionMT4.value,
      executionMT5: executionMT5.value,
    }
  }

  return {
    platforms,
    getPlatformEnum,
    depositMethods,
    getDepositMethodsEnum,
    regulators,
    getRegulatorsEnum,
    fillPolicy,
    getFillPolicyEnum,
    executionMT4,
    getExecutionMT4Enum,
    executionMT5,
    getExecutionMT5Enum,
    getAllEnums,
  }
}
