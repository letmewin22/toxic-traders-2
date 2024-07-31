<script setup lang="ts">
import type { iBrokerStatisticEngagement } from '~/types/broker/brokerStatisticEngagement'
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'
import { brokerStatisticsEngagementAdapter } from '~/utils/adapters/brokerStatisticsEngagementAdapter'

interface iProps {
  activeItem?: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
}

const props = defineProps<iProps>()

const engagementData = ref<iBrokerStatisticEngagement>(null)
const countryRank = computed(() => {
  const { Country, CountryCode, Rank } = engagementData.value?.countryRank || {}
  const fields = [Country, CountryCode, Rank].filter(item => !!item)

  if (!fields.length) {
    return 'N/A'
  }

  return fields.join(' ')
})

const engagement = computed(() => {
  const { Month, Year } = engagementData.value?.engagments || {}
  const fields = [Month, Year].filter(item => !!item)

  if (!fields.length) {
    return 'N/A'
  }

  return fields.join('/')
})

watch(
  () => props.activeItem,
  () => {
    engagementData.value = brokerStatisticsEngagementAdapter(props.activeItem)
  }
)

onMounted(() => {
  engagementData.value = brokerStatisticsEngagementAdapter(props.activeItem)
})
</script>

<template>
  <div class="statistics-content engagement">
    <h3 class="statistics-title engagement__title">Traffic & Engagement</h3>
    <ul class="statistics-list engagement__info">
      <li
        class="statistics-items engagement__info-column statistics-items--uniq"
      >
        <BrokerStatisticsInfoItem
          title="Global Rank"
          :text="engagementData?.globalRank"
        />
        <BrokerStatisticsInfoItem
          title="Category Rank"
          :text="engagementData?.categoryRank?.Category"
          :additional-text="engagementData?.categoryRank?.Rank"
        />
        <BrokerStatisticsInfoItem title="Country Rank" :text="countryRank" />
      </li>
      <li
        class="statistics-items engagement__info-column statistics-items--uniq"
      >
        <BrokerStatisticsInfoItem
          title="Engagements Visits"
          :text="engagementData?.engagmentsVisists"
        />
        <BrokerStatisticsInfoItem
          title="Engagements"
          :text="engagement"
          :additional-text="engagementData?.engagments.Visits"
        />
      </li>
      <li class="statistics-items engagement__info-column">
        <BrokerStatisticsInfoItem
          title="TrafficMonthlyAvg"
          :text="engagementData?.trafficMonthlyAvg"
        />
        <BrokerStatisticsInfoItem
          title="TrafficMonthlyCost"
          :text="engagementData?.trafficMonthlyCost"
        />
      </li>
      <li class="statistics-items engagement__info-column">
        <BrokerStatisticsInfoItem
          title="Organic Search Traffic"
          :text="engagementData?.organicSearchTraffic"
        />
      </li>
    </ul>
  </div>
</template>
