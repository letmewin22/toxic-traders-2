<script setup lang="ts">
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'
import { brokerStatisticsTrafficHistoryAdapter } from '~/utils/adapters/brokerStatisticsTrafficHistoryAdapter'

interface iProps {
  activeItem?: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
}

const props = defineProps<iProps>()

const trafficHistory = ref<{ date: string; organic: string }[]>([])

watch(
  () => props.activeItem,
  () => {
    trafficHistory.value = brokerStatisticsTrafficHistoryAdapter(
      props.activeItem
    )
  }
)

onMounted(() => {
  trafficHistory.value = brokerStatisticsTrafficHistoryAdapter(props.activeItem)
})
</script>

<template>
  <div class="statistics-content traffic-history">
    <h3 class="statistics-title traffic-history__title">Traffic History</h3>
    <ul class="statistics-list traffic-history__info">
      <li
        v-for="(item, idx) in trafficHistory"
        :key="idx"
        class="statistics-items traffic-history__info-column"
      >
        <BrokerStatisticsInfoItem :title="item.date" :text="item.organic" />
      </li>
      <li
        v-if="!trafficHistory.length"
        class="statistics-items traffic-history__info-column"
      >
        <BrokerStatisticsInfoItem title="Date" text="N/A" />
      </li>
    </ul>
  </div>
</template>
