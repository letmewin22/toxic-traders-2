<script setup lang="ts">
import { getBrokerDepositMethodsList } from '~/api/brokers/brokerDepositMethodsList'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const depositFullList = ref<string[]>([])
const depositList = ref<number[]>([])
const filteredDepositList = computed(() => {
  return removeUnderlines(
    depositList.value?.map(index => depositFullList.value[index]) || []
  ).map(item => ({ text: item }))
})

const { createDepositMethods, getDepositMethods, updateDepositMethods } =
  useBrokerDepositMethods()

const getDepositList = async () => {
  const depositData = await getDepositMethods(props.brokerId)
  depositList.value =
    depositData?.depositMethods?.map(item => item.depositMethod) || []
}

const selectDeposit = async (deposit: string) => {
  const depositIndex = depositFullList.value.findIndex(el => el === deposit)

  depositList.value.push(depositIndex)
  await createDepositMethods(props.brokerId, depositList.value)
  await getDepositList()
}

const removeDeposit = async (index: number) => {
  depositList.value.splice(index, 1)
  await updateDepositMethods(props.brokerId, depositList.value)
  await getDepositList()
}

onMounted(async () => {
  const depositMethodsListRequest = await getBrokerDepositMethodsList()

  depositFullList.value = removeUnderlines(
    Object.values(depositMethodsListRequest)
  )

  await getDepositList()
})
</script>

<template>
  <div class="deposit-methods">
    <TheAccordion class="deposit-methods__accordion" title="Method of deposit">
      <TagsInput
        id="deposit-methods"
        :dropdown-list="depositFullList"
        :badges-list="filteredDepositList"
        badge-variant="fill"
        @select="selectDeposit"
        @remove="removeDeposit"
      />
    </TheAccordion>
  </div>
</template>
