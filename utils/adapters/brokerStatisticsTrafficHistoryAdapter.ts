import { formatDate } from '../transformDate'
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'
import type { iBrokerStatisticTrafficHistory } from '~/types/broker/brokerStatisticTrafficHistory'

export const brokerStatisticsTrafficHistoryAdapter = (
  params: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
) => {
  const trafficHistory: iBrokerStatisticTrafficHistory[] = JSON.parse(
    params?.trafficHistory || '[]'
  )

  const updatedItem = trafficHistory.map(item => ({
    date: formatDate(item?.date),
    organic: formatNumber(item?.organic),
  }))

  return updatedItem
}
