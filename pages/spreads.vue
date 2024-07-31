<script setup lang="ts">
import debounce from 'debounce'
import type {
  iBrokerServerAccountSymbolsSpread,
  iBrokerUniqueServerAccountSymbolsSpread,
} from '~/types/broker/brokerServerAccountSymbols'

const router = useRouter()
const symbolsNames = ref([])
const filteredSymbolsNames = ref([])
const spreads = ref<iBrokerServerAccountSymbolsSpread[]>([])
const filteredSpreads = ref<iBrokerUniqueServerAccountSymbolsSpread[]>([])
const selectedSymbol = ref<string>(null)
const isContentLoading = ref(true)
const isTableLoading = ref(true)
const sortBy = ref('BrokerCompanyNames')
const sortOrder = ref<1 | 2>(1)
const descriptionValue = ref('none')

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
} = usePagination()

const { getServerAccountSymbolsNames, getServerAccountSymbolsSpreadsCurrent } =
  useBrokerServerAccountSymbols()

const descriptionInput = reactive({
  title: 'Description',
  required: false,
  id: 'spreads-description',
  name: 'Spreads description',
  type: 'text',
  value: '',
  placeholder: 'Write your desription',
  isRightButton: true,
})

const symbolSelect = computed(() => {
  return {
    options: filteredSymbolsNames.value,
    placeholder: 'Select symbol',
    title: 'Symbol',
    searchInput: {
      id: 'spreads-search-symbol',
      required: false,
      name: 'Spreads search symbol',
      type: 'text',
      placeholder: 'Search symbol',
      isRightButton: true,
    },
  }
})

const getCurrentSpreadRequest = async () => {
  isTableLoading.value = true

  const { brokerServerAccountSymbols, totalCount } =
    await getServerAccountSymbolsSpreadsCurrent({
      symbolName: selectedSymbol.value || '*',
      description: descriptionValue.value,
      page: currentPage.value - 1,
      pageSize: itemsCount.value,
      sortBy: sortBy.value || 'BrokerCompanyNames',
      sortOrder: sortOrder.value || 0,
    })

  isTableLoading.value = false
  spreads.value = brokerServerAccountSymbols
  filteredSpreads.value = spreads.value.map(item => {
    return {
      broker: item?.brokerCompanyNames[0],
      accountType: item?.accountType,
      serverType: item?.serverType === 0 ? 'MT4' : 'MT5',
      spread: item?.spread,
      newsSpread: item?.newsSpread,
    }
  })

  totalCountPages.value = totalCount
}

const debounceDescription = debounce(async (val: string) => {
  descriptionValue.value = val
  await getCurrentSpreadRequest()
}, 1000)

// const platformsSelect = computed(() => {
//   return {
//     options: ['MT 4', 'MT 5'],
//     placeholder: 'Select platform',
//     title: 'Platforms',
//   }
// })

// const getAllSpreadsRequest = async () => {
//   isTableLoading.value = true

//   const { brokerServerAccountSymbols, totalCount } =
//     await getServerAccountSymbolsSpreadsAll({
//       page: currentPage.value - 1,
//       pageSize: itemsCount.value,
//       sortBy: sortBy.value || 'BrokerCompanyNames',
//       sortOrder: sortOrder.value || 1,
//     })

//   isTableLoading.value = false
//   spreads.value = brokerServerAccountSymbols
//   filteredSpreads.value = spreads.value.map(item => {
//     return {
//       broker: item?.brokerCompanyNames[0],
//       accountType: item?.accountType,
//       serverType: item?.serverType === 0 ? 'MT4' : 'MT5',
//       spread: item?.spread,
//       newsSpread: item?.newsSpread,
//     }
//   })

//   totalCountPages.value = totalCount
// }

const searchSymbolsName = (searchValue: string) => {
  filteredSymbolsNames.value = symbolsNames.value?.filter(
    item =>
      item.toLowerCase().trim().includes(searchValue.toLowerCase().trim()) &&
      item !== selectedSymbol.value
  )
}

const selectSymbolsName = async (item: string) => {
  selectedSymbol.value = item
  filteredSymbolsNames.value = symbolsNames.value?.filter(name => name !== item)
  await getCurrentSpreadRequest()
}

const resetSelectedSymbol = async () => {
  selectedSymbol.value = null
  filteredSymbolsNames.value = symbolsNames.value

  await getCurrentSpreadRequest()
}

// const selectPlatform = (item: string) => {
//   console.log(item)
// }

const onChange = (inputData: iInputData) => {
  debounceDescription(inputData.value)
}

const onSorted = async (sortState: ISortState) => {
  sortBy.value = removeSpaces(formatToSnakeCase(sortState.sortBy))
  sortOrder.value = sortState.sortOrder

  await getCurrentSpreadRequest()
}

const headerFields = computed(() => {
  return Object.keys(filteredSpreads.value[0] ?? {})
})

watch(
  () => spreads.value,
  () => {
    filteredSpreads.value = spreads.value.map(item => {
      return {
        broker: item?.brokerCompanyNames[0],
        accountType: item?.accountType,
        serverType: item?.serverType === 0 ? 'MT4' : 'MT5',
        spread: item?.spread,
        newsSpread: item?.newsSpread,
      }
    })
  }
)

watch([currentPage, itemsCount], async () => {
  await getCurrentSpreadRequest()

  router.push({
    query: {
      page: currentPage.value,
      count: itemsCount.value,
    },
  })
})

onMounted(async () => {
  try {
    isContentLoading.value = true
    symbolsNames.value = await getServerAccountSymbolsNames()

    await getCurrentSpreadRequest()

    filteredSymbolsNames.value = symbolsNames.value?.filter(
      name => name !== selectedSymbol.value
    )
  } finally {
    isContentLoading.value = false
  }
})
</script>

<template>
  <main>
    <div class="spreads">
      <div class="container spreads__wrapper">
        <h1 class="spreads__title">Spreads</h1>
        <div v-if="!isContentLoading" class="spreads__main-content">
          <div class="spreads__content">
            <ul class="spreads__select-list">
              <li class="spreads__select-item">
                <CustomSelect
                  :options="symbolSelect.options"
                  :search-input="symbolSelect.searchInput"
                  :placeholder="symbolSelect.placeholder"
                  :title="symbolSelect.title"
                  :value="selectedSymbol"
                  @search="searchSymbolsName"
                  @select="selectSymbolsName"
                >
                  <template #select-icon>
                    <button
                      v-if="selectedSymbol"
                      class="spreads__select-item-btn"
                      @click.stop="resetSelectedSymbol"
                    >
                      <IconsClose />
                    </button>
                  </template>
                </CustomSelect>
              </li>
              <li class="spreads__select-item">
                <TheInput
                  :id="descriptionInput.id"
                  :required="descriptionInput.required"
                  :title="descriptionInput.title"
                  :name="descriptionInput.name"
                  :type="descriptionInput.type"
                  :placeholder="descriptionInput.placeholder"
                  :value="descriptionInput.value"
                  :is-right-button="descriptionInput.isRightButton"
                  class="spreads__description"
                  @input-value="onChange"
                >
                  <template #right-icon>
                    <IconsSearch />
                  </template>
                </TheInput>
              </li>
              <!-- <li class="spreads__select-item">
                <CustomSelect
                  :options="platformsSelect.options"
                  :placeholder="platformsSelect.placeholder"
                  :title="platformsSelect.title"
                  @select="selectPlatform"
                >
                  <template #right-icon>
                    <IconsSearch />
                  </template>
                </CustomSelect>
              </li> -->
            </ul>
          </div>
          <UiLoader v-if="isTableLoading && filteredSpreads.length" />
          <div v-else class="spreads__table-wrapper">
            <div class="spreads__table-content">
              <SpreadsTable
                :header-fields="headerFields"
                :table-items="filteredSpreads"
                :default-sort-by="sortBy"
                class="spreads__table"
                @sort="onSorted"
              />
              <ThePagination
                class="spreads__pagination"
                :total-pages="totalCountPages"
                :current-page="currentPage"
                :options="['25 rows', '50 rows', '100 rows']"
                :items-count="itemsCount"
                :input-value="searchValue"
                input-id="spreads-table"
                input-name="Spreads table"
                @next-click="nextPageClick"
                @prev-click="prevPageClick"
                @selected-item="onChangeCount"
                @on-blur-value="onInputBlur"
                @on-change-value="onInputChange"
              />
            </div>
          </div>
        </div>
        <UiLoader v-if="isContentLoading" />
      </div>
    </div>
  </main>
</template>
