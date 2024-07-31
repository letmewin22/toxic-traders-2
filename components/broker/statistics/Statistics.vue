<script setup lang="ts">
import type { iCompanyNamesItem } from '~/types/broker/brokerCompanyNames'
import type {
  iBrokerCompanyNameStatisticAhrefs,
  iBrokerCompanyNameStatisticSemrush,
  iBrokerCompanyNameStatisticSimilarWeb,
} from '~/types/broker/brokerStatisticProvider'
import { formatDateAmpm } from '~/utils/transformDate'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const { getCompanyNamesById } = useBrokerCompanyNames()
const { getCurrentStatisticProviders } = useBrokerStatistic()

const companyNamesList = ref<iCompanyNamesItem[]>([])
const websites = ref([])
const statisticsModalOpened = ref(false)
const selectedWebsiteId = ref(null)
const ahrefsStatistic = ref<iBrokerCompanyNameStatisticAhrefs[]>(null)
const semrushStatistic = ref<iBrokerCompanyNameStatisticSemrush[]>(null)
const similarWebStatistic = ref<iBrokerCompanyNameStatisticSimilarWeb[]>(null)
const statisticsData = ref([])
const activeStatisticItem = ref(null)

const getSelectedItem = (website: string) => {
  selectedWebsiteId.value = companyNamesList.value.find(
    item => item.website === website
  )?.id
}

const getStatisticItem = (item: string) => {
  const [provider, timestamp] = item.split(' - ')

  activeStatisticItem.value = statisticsData.value.find(
    item =>
      item.provider === provider &&
      formatDateAmpm(item.parsingTimestamp) === timestamp
  )
}

const statisticsModalOpen = async () => {
  statisticsModalOpened.value = true
  document.body.classList.add('modal-open')

  ahrefsStatistic.value = (await getCurrentStatisticProviders(
    selectedWebsiteId.value,
    'Ahrefs'
  )) as iBrokerCompanyNameStatisticAhrefs[]

  semrushStatistic.value = (await getCurrentStatisticProviders(
    selectedWebsiteId.value,
    'Semrush'
  )) as iBrokerCompanyNameStatisticSemrush[]

  similarWebStatistic.value = (await getCurrentStatisticProviders(
    selectedWebsiteId.value,
    'SimilarWeb'
  )) as iBrokerCompanyNameStatisticSimilarWeb[]

  statisticsData.value = [
    ...ahrefsStatistic.value.map(item => ({ ...item, provider: 'Ahrefs' })),
    ...semrushStatistic.value.map(item => ({ ...item, provider: 'Semrush' })),
    ...similarWebStatistic.value.map(item => ({
      ...item,
      provider: 'SimilarWeb',
    })),
  ]

  activeStatisticItem.value = statisticsData.value[0]
}

const timeArr = computed(() => {
  return statisticsData.value
    .sort((a, b) => {
      return a.parsingTimestamp < b.parsingTimestamp ? 1 : -1
    })
    .map(item => `${item.provider} - ${formatDateAmpm(item.parsingTimestamp)}`)
})

const statisticsModalClose = () => {
  statisticsModalOpened.value = false
}

onMounted(async () => {
  const { companyNames } = await getCompanyNamesById(props.brokerId)

  companyNamesList.value = companyNames
  websites.value = companyNames.map(item => item.website)

  selectedWebsiteId.value = companyNamesList.value[0]?.id || null
})
</script>

<template>
  <div class="statistics">
    <div v-if="websites?.length" class="statistics-data">
      <CustomSelect
        :options="websites"
        :placeholder="websites[0] || 'Choose website'"
        class="statistics__select"
        @select="getSelectedItem"
      />
      <div class="statistics__table-wrapper">
        <div class="statistics__table">
          <BrokerStatisticsTable
            :broker-id="brokerId"
            :website-id="selectedWebsiteId"
          />
        </div>

        <TheButton
          v-if="selectedWebsiteId"
          tag="button"
          button-size="small"
          variant="fill"
          class="statistics__table-btn"
          @click="statisticsModalOpen"
        >
          More info
        </TheButton>
      </div>
      <SlidingModal
        :modal-opened="statisticsModalOpened"
        title="Statistics"
        @close="statisticsModalClose"
      >
        <div class="statistics__modal-wrapper">
          <CustomSelect
            :options="timeArr"
            :placeholder="timeArr[0] || 'Choose item'"
            class="statistics__modal-select"
            @select="getStatisticItem"
          />
          <div class="statistics__modal-content">
            <BrokerStatisticsOverview :active-item="activeStatisticItem" />
            <BrokerStatisticsEngagement :active-item="activeStatisticItem" />
            <BrokerStatisticsTrafficHistory
              :active-item="activeStatisticItem"
            />
            <BrokerStatisticsMonthlyVisits :active-item="activeStatisticItem" />
            <BrokerStatisticsTopCountries :active-item="activeStatisticItem" />
            <BrokerStatisticsTopCountryShares
              :active-item="activeStatisticItem"
            />
          </div>
        </div>
      </SlidingModal>
    </div>
    <div v-else style="margin: 0auto; text-align: center">
      This broker does not have a website to display statistics
    </div>
  </div>
</template>
