<script setup lang="ts">
import type { iBrokerUniqueServerAccountSymbolsSpread } from '~/types/broker/brokerServerAccountSymbols'

interface iProps {
  tableItems: iBrokerUniqueServerAccountSymbolsSpread[]
  headerFields: string[]
  defaultSortBy?: string
}

const props = defineProps<iProps>()

const emit = defineEmits(['sort'])

const formattedHeadingFields = computed(() => {
  return props.headerFields.map(field => formatNameToNormalCase(field))
})

const { sortState, onSort } = useSort(
  {
    sortBy: props.defaultSortBy,
  },
  () => emit('sort', sortState.value)
)
</script>

<template>
  <div class="spreads-table">
    <div class="spreads-table__wrapper">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              v-for="(headerItem, idx) in formattedHeadingFields"
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
          <TableRow v-for="(item, idx) in tableItems" :key="idx">
            <TableCell
              v-for="(cell, i) in item"
              :key="i"
              :item="cell || 'N/A'"
              :class="`table-cell--${i}`"
            />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
