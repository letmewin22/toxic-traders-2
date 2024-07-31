<script setup lang="ts">
import type { iBrokerStatisticOverview } from '~/types/broker/brokerStatisticOverview'
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'
import { brokerStatisticsOverviewAdapter } from '~/utils/adapters/brokerStatisticsOverviewAdapter'

interface iProps {
  activeItem?: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
}

const props = defineProps<iProps>()

const overviewData = ref<iBrokerStatisticOverview>(null)

watch(
  () => props.activeItem,
  () => {
    overviewData.value = brokerStatisticsOverviewAdapter(props.activeItem)
  }
)

onMounted(() => {
  overviewData.value = brokerStatisticsOverviewAdapter(props.activeItem)
})
</script>

<template>
  <div class="statistics-content overview">
    <h3 class="statistics-title overview__title">Overview</h3>
    <ul class="statistics-list overview__info">
      <li class="statistics-items overview__info-column">
        <BrokerStatisticsInfoItem
          title="Website"
          :link="{
            url: overviewData?.webSite,
            text: overviewData?.webSite,
          }"
        />
      </li>
      <li class="statistics-items overview__info-column">
        <BrokerStatisticsInfoItem
          title="Last updated"
          :text="overviewData?.parsingTimestamp"
        />
      </li>
    </ul>
  </div>
</template>
