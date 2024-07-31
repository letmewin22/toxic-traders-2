<script setup lang="ts">
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'
import { brokerStatisticsMonthlyVisitsAdapter } from '~/utils/adapters/brokerStatisticsMonthlyVisitsAdapter'

interface iProps {
  activeItem?: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
}

const props = defineProps<iProps>()

const trafficHistory = ref<{ title: string; text: string }[]>([])

watch(
  () => props.activeItem,
  () => {
    trafficHistory.value = brokerStatisticsMonthlyVisitsAdapter(
      props.activeItem
    )
  }
)

onMounted(() => {
  trafficHistory.value = brokerStatisticsMonthlyVisitsAdapter(props.activeItem)
})
</script>

<template>
  <div class="statistics-content monthly-visits">
    <h3 class="statistics-title monthly-visits__title">
      Estimated Monthly Visits
    </h3>
    <ul class="statistics-list monthly-visits__info">
      <li
        v-for="(item, idx) in trafficHistory"
        :key="idx"
        class="statistics-items monthly-visits__info-column"
      >
        <BrokerStatisticsInfoItem :title="item.title" :text="item.text" />
      </li>
      <li
        v-if="!trafficHistory.length"
        class="statistics-items monthly-visits__info-column"
      >
        <BrokerStatisticsInfoItem title="Date" text="N/A" />
      </li>
    </ul>
  </div>
</template>
