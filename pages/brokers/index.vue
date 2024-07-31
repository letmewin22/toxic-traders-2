<script setup lang="ts">
import type { ISortState } from '~/composables/sort'
import type { iSearchInput } from '~/types'
import type { iBroker } from '~/types/broker/broker'
import { getBrokerHeadings } from '~/utils/formatBrokerHeaders'
import { removeSpaces } from '~/utils/removeSpaces'

const router = useRouter()
const route = useRoute()

const brokersList = ref<iBroker[]>([])
const filteredBrokers = ref<iBroker[]>([])

const isLoading = ref(true)
const isSearchOpened = ref(false)
const isSettingsOpened = ref(false)
const isHistoryOpened = ref(false)
const sortedBy = ref('companynames')
const sortedOrder = ref<1 | 2>(1)
const searchData = ref<iSearchInput[]>([])

const { getAllBrokersBySearch } = useBrokers()

const toggleSearch = () => {
  isSearchOpened.value = !isSearchOpened.value
}

const openSettings = () => {
  isSettingsOpened.value = true
  document.body.classList.add('modal-open')
}

const closeSettings = () => {
  isSettingsOpened.value = false
}

const openHistory = () => {
  isHistoryOpened.value = true
  document.body.classList.add('modal-open')
}

const closeHistory = () => {
  isHistoryOpened.value = false
}

const changeTableColumns = (properties: string[]) => {
  filteredBrokers.value = brokersList.value.map(broker => {
    const formattedColumnsName = Object.keys(broker)

    let newObj = {}

    formattedColumnsName.forEach(column => {
      if (properties.includes(column)) {
        newObj = {
          ...newObj,
          [column]: broker[column],
        }
      }
    })

    return newObj
  })
}

const brokersHeadings = computed(() => {
  return getBrokerHeadings(brokersList.value[0] ?? {})
})

const filteredBrokerHeading = computed(() => {
  return getBrokerHeadings(filteredBrokers.value[0] ?? {})
})

const {
  currentPage,
  itemsCount,
  searchValue,
  totalCountPages,
  nextPageClick,
  prevPageClick,
  onInputBlur,
  onInputChange,
  onChangeCount,
} = usePagination(
  route.query.page && Number(route.query.page),
  route.query.count && Number(route.query.count)
)

const getBrokersRequest = async () => {
  isLoading.value = true

  const { brokers, totalCount } = await getAllBrokersBySearch({
    offset: currentPage.value - 1,
    count: itemsCount.value,
    sortBy: sortedBy.value || 'companynames',
    sortOrder: sortedOrder.value || 0,
    data: searchData.value ?? [],
  })

  isLoading.value = false
  brokersList.value = brokers
  filteredBrokers.value = brokersList.value
  totalCountPages.value = totalCount
}

watch([currentPage, itemsCount], async () => {
  await getBrokersRequest()

  router.push({
    query: {
      page: currentPage.value,
      count: itemsCount.value,
    },
  })
})

onMounted(async () => {
  await getBrokersRequest()
})

const onSearch = async (data: iSearchInput[]) => {
  searchData.value = data

  currentPage.value = 1
  await getBrokersRequest()
}

const onSort = async (sortState: ISortState) => {
  sortedBy.value = removeSpaces(formatToSnakeCase(sortState.sortBy))
  sortedOrder.value = sortState.sortOrder

  await getBrokersRequest()
}
</script>

<template>
  <main>
    <section class="brokers">
      <div class="container brokers__wrapper">
        <div class="brokers__menu-wrapper">
          <h1 class="brokers__title">All Brokers</h1>
          <div class="brokers__menu">
            <TheButton
              tag="button"
              button-size="medium"
              variant="outlined"
              @click="toggleSearch"
            >
              {{ isSearchOpened ? 'Hide Search' : 'Search' }}
              <template #start-icon>
                <IconsSearch />
              </template>
            </TheButton>
            <TheButton
              v-if="brokersList?.length"
              tag="button"
              button-size="medium"
              variant="fill"
              @click="openSettings"
            >
              Settings
              <template #start-icon>
                <IconsSettings />
              </template>
            </TheButton>
            <TheButton
              tag="button"
              button-size="medium"
              variant="outlined"
              @click="openHistory"
            >
              History
            </TheButton>
          </div>
        </div>
      </div>
      <div
        class="brokers__content"
        :class="isSearchOpened && 'brokers__content--search'"
      >
        <BrokersSearch :is-opened="isSearchOpened" @search="onSearch" />
        <div v-if="brokersList.length" class="brokers__table-wrapper">
          <BrokersTable
            :is-search-opened="isSearchOpened"
            :brokers="filteredBrokers"
            :heading-fields="filteredBrokerHeading"
            :default-sort-by="sortedBy"
            class="brokers__table"
            @sort="onSort"
          />
          <ThePagination
            class="brokers__pagination"
            :total-pages="totalCountPages"
            :current-page="currentPage"
            :options="['25 rows', '50 rows', '100 rows']"
            :items-count="itemsCount"
            :input-value="searchValue"
            input-id="brokers-navigation"
            input-name="Brokers navigation"
            @next-click="nextPageClick"
            @prev-click="prevPageClick"
            @selected-item="onChangeCount"
            @on-blur-value="onInputBlur"
            @on-change-value="onInputChange"
          />
        </div>
        <p
          v-if="!isLoading && !brokersList.length"
          class="brokers__error-message"
        >
          No items found
        </p>
      </div>
      <div v-if="isLoading">
        <UiLoader class="brokers__loader" />
      </div>
    </section>
    <TheModal
      :modal-opened="isSettingsOpened"
      title="Choose needed properties"
      class-name="brokers__modal"
      @close="closeSettings"
    >
      <TheSettings :properties="brokersHeadings" @change="changeTableColumns" />
    </TheModal>
    <SlidingModal
      :modal-opened="isHistoryOpened"
      title="History"
      @close="closeHistory"
    >
      <TheHistory />
    </SlidingModal>
  </main>
</template>
