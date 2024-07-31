import type { iBrokerStatisticEngagement } from '~/types/broker/brokerStatisticEngagement'
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'

export const brokerStatisticsEngagementAdapter = (
  params: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
): iBrokerStatisticEngagement => {
  const updatedItem: iBrokerStatisticEngagement = {
    ...params,
    countryRank: JSON.parse(params?.countryRank || '[]'),
    categoryRank: JSON.parse(params?.categoryRank || '[]'),
    engagments: JSON.parse(params?.engagments || '[]'),
  }

  const obj = {
    globalRank: formatNumber(+updatedItem?.globalRank),
    categoryRank: {
      Rank: formatNumber(+updatedItem?.categoryRank?.Rank),
      Category: updatedItem?.categoryRank?.Category,
    },
    countryRank: {
      Country: updatedItem?.countryRank?.Country,
      CountryCode: updatedItem?.countryRank?.CountryCode,
      Rank: updatedItem?.countryRank?.Rank,
    },
    engagmentsVisists: formatNumber(+updatedItem?.engagmentsVisists),
    engagments: {
      Month: updatedItem?.engagments?.Month,
      Year: updatedItem?.engagments?.Year,
      Visits: formatNumber(+updatedItem?.engagments?.Visits),
    },
    trafficMonthlyAvg: formatNumber(+updatedItem?.trafficMonthlyAvg),
    trafficMonthlyCost: formatNumber(+updatedItem?.trafficMonthlyCost),
    organicSearchTraffic: formatNumber(+updatedItem?.organicSearchTraffic),
  }

  return obj
}
