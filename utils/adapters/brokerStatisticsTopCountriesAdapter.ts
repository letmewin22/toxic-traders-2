import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'
import type { iBrokerStatisticTopCountries } from '~/types/broker/brokerStatisticTopCountries'

export const brokerStatisticsTopCountriesAdapter = (
  params: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
) => {
  const trafficHistory: iBrokerStatisticTopCountries[] = JSON.parse(
    params?.topCountries || '[]'
  )

  const updatedItem = trafficHistory.map(item => ({
    country: item.country,
    share: numberToPercent(item.share, 2),
  }))

  return updatedItem
}
