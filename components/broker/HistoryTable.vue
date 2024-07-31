<script setup lang="ts">
import { getBrokerLogs } from '~/api/brokers/getBrokerLogs'
import type { iBrokerLogItem } from '~/types/broker/brokerLogs'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const headerFields = ['ID', 'Message', 'Timestamp', 'Level']
const logsList = ref<iBrokerLogItem[]>([])

onMounted(async () => {
  try {
    const { brokerLogs } = await getBrokerLogs(props.brokerId)
    logsList.value = brokerLogs || []
  } catch (error) {
    logsList.value = []
  }
})

const onSorted = () => {
  logsList.value = logsList.value.sort((a, b) => {
    if (sortState.value.sortOrder === 1) {
      return a[sortState.value.sortBy] > b[sortState.value.sortBy] ? 1 : -1
    } else {
      return a[sortState.value.sortBy] < b[sortState.value.sortBy] ? 1 : -1
    }
  })
}

const { sortState, onSort } = useSort(
  {
    sortBy: 'ID',
  },
  onSorted
)
</script>

<template>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell
          v-for="(headerItem, idx) in headerFields"
          :key="idx"
          :item="headerItem"
          :class="`table-cell--${idx}`"
          :is-sort="true"
          :sort-order="sortState.sortOrder"
          :is-active="sortState.sortBy === headerItem"
          @sort="onSort"
        />
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow v-for="(log, idx) in logsList" :key="idx">
        <TableCell
          v-for="(item, id, index) in log"
          :key="id"
          :item="item"
          :class="`table-cell--${index}`"
        />
      </TableRow>
    </TableBody>
  </Table>
</template>
