import type { iBrokerStatisticMonthlyVisits } from '~/types/broker/brokerStatisticMonthlyVisits'
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'

export const brokerStatisticsMonthlyVisitsAdapter = (
  params: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
) => {
  const monthlyVisitsObject: iBrokerStatisticMonthlyVisits = JSON.parse(
    params?.estimatedMonthlyVisits || '[]'
  )

  const objectsOfArray: { title: string; text: string }[] = []

  for (const [title, text] of Object.entries(monthlyVisitsObject)) {
    const transformedText = formatNumber(text)
    objectsOfArray.push({ title, text: transformedText })
  }

  return objectsOfArray
}
