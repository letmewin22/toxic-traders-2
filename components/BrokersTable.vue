<script setup lang="ts">
import type { iBroker } from '~/types/broker/broker'

interface iProps {
  brokers: iBroker[]
  isSearchOpened: boolean
  headingFields: string[] | []
  defaultSortBy?: string
}

const props = defineProps<iProps>()

const emit = defineEmits(['sort'])

// onMounted(() => {
//   console.log(
//     props.brokers.map(broker => {
//       return {
//         ...broker,
//         companyNames: {
//           text: broker.companyNames,
//           url: `/brokers/${broker.companyNames}`,
//         },
//       }
//     })
//   )
// })

// const updatedBrokers = computed(() => {
//   return props.brokers.map(broker => adapter(broker))
// })

const formattedHeadingFields = computed(() => {
  return props.headingFields.map(field => formatNameToNormalCase(field))
})

const { sortState, onSort } = useSort(
  {
    sortBy: props.defaultSortBy,
  },
  () => emit('sort', sortState.value)
)

const notSortableFields = [
  'Broker Platforms',
  'Regulator Name',
  'Restricted Countries',
]

const isSortable = (field: string) => {
  return !notSortableFields.includes(field)
}
</script>

<template>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell
          v-for="(headerItem, idx) in formattedHeadingFields"
          :key="idx"
          :item="headerItem"
          :class="[`table-cell--${idx}`, `table-cell--${headingFields[idx]}`]"
          :is-sort="isSortable(headerItem)"
          :sort-order="sortState.sortOrder"
          :is-active="sortState.sortBy === headerItem"
          @sort="onSort"
        />
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow
        v-for="(broker, idx) in brokers"
        :key="idx"
        :link="{
          url: `/brokers/${broker.id}`,
        }"
      >
        <TableCell
          v-for="(item, id, index) in broker"
          :key="id"
          :item="item"
          :class="[
            `table-cell--${index}`,
            `table-cell--${headingFields[index]}`,
          ]"
          :link="
            broker.companyNames === item
              ? {
                  url: `/brokers/${broker.id}`,
                  text: broker.companyNames,
                }
              : null
          "
        />
      </TableRow>
    </TableBody>
  </Table>
</template>
