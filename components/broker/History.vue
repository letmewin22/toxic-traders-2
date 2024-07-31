<script lang="ts" setup>
interface IProps {
  isOpened: boolean
  brokerId: number
}

defineProps<IProps>()
const emit = defineEmits(['close'])
</script>

<template>
  <SlidingModal :modal-opened="isOpened" title="History" @close="emit('close')">
    <BrokerHistoryTable :broker-id="Number(brokerId)" />
  </SlidingModal>
</template>
