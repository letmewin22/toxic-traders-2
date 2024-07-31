import { formatDateAmpm } from '../transformDate'
import type { iBrokerStatisticOverview } from '~/types/broker/brokerStatisticOverview'
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'

export const brokerStatisticsOverviewAdapter = (
  params: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
): iBrokerStatisticOverview => {
  const obj = {
    webSite: params?.webSite,
    parsingTimestamp: formatDateAmpm(params?.parsingTimestamp),
  }

  return obj
}
