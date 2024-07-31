import type { iBrokerStatisticCountryShares } from '~/types/broker/brokerStatisticCountryShares'
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'

export const brokerStatisticsCountrySharesAdapter = (
  params: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
) => {
  const countryShares: iBrokerStatisticCountryShares[] = JSON.parse(
    params?.topCountryShares || '[]'
  )

  const updatedItem = countryShares.map(item => ({
    Country: item.Country,
    CountryCode: item.CountryCode,
    Value: numberToPercent(item.Value, 2),
  }))

  return updatedItem
}
