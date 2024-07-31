<script setup lang="ts">
import { getCountriesFlag } from '~/api/countries/getCountries'
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'
import type { iCountries } from '~/types/countries/countries'
import { brokerStatisticsTopCountriesAdapter } from '~/utils/adapters/brokerStatisticsTopCountriesAdapter'

interface iProps {
  activeItem?: iBrokerCompanyNameStatisticAhrefs &
    iBrokerCompanyNameStatisticSemrush &
    iBrokerCompanyNameStatisticSimilarWeb
}

const props = defineProps<iProps>()

const topCountries = ref<{ country: string; share: string }[]>([])
const flagsRequestData = ref<iCountries[]>([])
const countriesWithFlag = computed(() => {
  return topCountries.value.map(item => {
    const matchingFlag = flagsRequestData.value.find(
      flag => flag.countryShortName.toLowerCase() === item.country.toLowerCase()
    )

    return {
      countryFullName: matchingFlag.countryFullName,
      countryShortName: item.country.toUpperCase(),
      countryFlag: matchingFlag.countryFlag,
      countryShare: item.share,
    }
  })
})

watch(
  () => props.activeItem,
  () => {
    topCountries.value = brokerStatisticsTopCountriesAdapter(props.activeItem)
  }
)

onMounted(async () => {
  flagsRequestData.value = await getCountriesFlag()

  topCountries.value = brokerStatisticsTopCountriesAdapter(props.activeItem)
})
</script>

<template>
  <div class="statistics-content top-countries">
    <h3 class="statistics-title top-countries__title">Top Countries</h3>
    <ul class="statistics-list top-countries__info">
      <li
        v-for="(item, idx) in countriesWithFlag"
        :key="idx"
        class="statistics-items top-countries__info-column"
      >
        <BrokerStatisticsInfoItem
          :title="item.countryFullName"
          :text="item.countryShare"
          :img="item.countryFlag"
        />
      </li>
      <li
        v-if="!countriesWithFlag.length"
        class="statistics-items top-countries__info-column"
      >
        <BrokerStatisticsInfoItem title="Country name" text="N/A" />
      </li>
    </ul>
  </div>
</template>
