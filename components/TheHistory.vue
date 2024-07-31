<script setup lang="ts">
import { getLogs } from '~/api/logs/getLogs'
import type { iLogItem } from '~/types/logs'

const logsList = ref<iLogItem[]>([])
const sortedBy = ref('id')
const sortedOrder = ref<1 | 2>(1)

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

const fetchLogs = async () => {
  const { logs, totalCount } = await getLogs(
    currentPage.value - 1,
    itemsCount.value,
    sortedBy.value,
    sortedOrder.value
  )

  logsList.value = logs
  totalCountPages.value = totalCount
}

onMounted(async () => {
  await fetchLogs()
})

watch([currentPage, itemsCount], async () => {
  await fetchLogs()
})

const onSort = async (sortState: ISortState) => {
  sortedBy.value = removeSpaces(formatToSnakeCase(sortState.sortBy))
  sortedOrder.value = sortState.sortOrder

  await fetchLogs()
}
</script>

<template>
  <div class="history">
    <HistoryTable
      v-if="logsList?.length"
      class="history__table"
      :logs="logsList"
      @sort="onSort"
    />
    <ThePagination
      class="history__pagination"
      :total-pages="totalCountPages"
      :current-page="currentPage"
      :options="['25', '50', '100']"
      :items-count="itemsCount"
      :input-value="searchValue"
      input-id="history-table-navigation"
      input-name="History table navigation"
      @next-click="nextPageClick"
      @prev-click="prevPageClick"
      @selected-item="onChangeCount"
      @on-blur-value="onInputBlur"
      @on-change-value="onInputChange"
    />
  </div>
</template>
