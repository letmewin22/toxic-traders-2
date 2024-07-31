<script setup lang="ts">
import type { iServerAddress } from '~/types/broker/brokerServerAddresses'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const serverAddresses = ref<iServerAddress[]>([])
const filteredServerAddresses = ref<iServerAddress[]>([])

const { getServerAddresses } = useBrokerServerAddresses()

const showMoreServerAddresses = () => {
  filteredServerAddresses.value = serverAddresses.value
}

const showLessServerAddresses = () => {
  filteredServerAddresses.value = serverAddresses.value.slice(0, 1)
}

onMounted(async () => {
  const serverAddressesRequest = await getServerAddresses(props.brokerId)

  if (serverAddressesRequest?.length) {
    serverAddresses.value = serverAddressesRequest
  }
  showLessServerAddresses()
})
</script>

<template>
  <div class="server-addresses">
    <TheAccordion title="Server Addresses" :is-inputs="true">
      <div
        v-for="(item, idx) in filteredServerAddresses"
        :key="idx"
        class="server-addresses__item"
      >
        <p class="server-addresses__text">
          {{ item?.address }}
        </p>
      </div>
      <div v-if="!serverAddresses?.length" class="server-addresses__item">
        <p class="server-addresses__text">Server address is not found</p>
      </div>

      <OptionalButton
        v-if="
          serverAddresses.length > 1 &&
          filteredServerAddresses.length !== serverAddresses.length
        "
        @on-click="showMoreServerAddresses"
        >Show more</OptionalButton
      >
      <OptionalButton
        v-if="filteredServerAddresses.length > 1"
        @on-click="showLessServerAddresses"
        >Show less</OptionalButton
      >
    </TheAccordion>
  </div>
</template>
