<script setup lang="ts">
import type { iBrokerServerAccountOrder } from '~/types/broker/brokerServer'

interface iProps {
  accountOrders: iBrokerServerAccountOrder[]
}

const props = defineProps<iProps>()

const headingFields = ref<string[]>([])

onMounted(() => {
  headingFields.value = Object.keys(props.accountOrders[0] || {})
})
</script>

<template>
  <div class="order-list-table">
    <Table v-if="accountOrders?.length" class="order-list-table__table">
      <TableHead>
        <TableRow>
          <TableCell
            v-for="(headerItem, idx) in headingFields"
            :key="idx"
            :item="headerItem"
            :class="`table-cell--${idx}`"
          />
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow v-for="(order, idx) in accountOrders" :key="idx">
          <TableCell
            v-for="(item, id, index) in order"
            :key="id"
            :item="item"
            :class="[`table-cell--${index}`]"
          />
        </TableRow>
      </TableBody>
    </Table>
    <p v-else class="order-list-table__error">Orders not found</p>
  </div>
</template>
