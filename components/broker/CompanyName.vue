<script setup lang="ts">
import type { iCompanyNamesItem } from '~/types/broker/brokerCompanyNames'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const companyNamesList = ref<iCompanyNamesItem[]>([])

const { getCompanyNamesById } = useBrokerCompanyNames()

onMounted(async () => {
  const { companyNames } = await getCompanyNamesById(props.brokerId)

  if (companyNames?.length) {
    companyNamesList.value = companyNames
  }
})
</script>

<template>
  <div class="company-name">
    <TheAccordion title="Company Name" :is-inputs="true">
      <div
        v-for="(item, idx) in companyNamesList"
        :key="idx"
        class="company-name__item"
      >
        <p class="company-name__text">
          {{ item?.companyName }}
        </p>
      </div>
      <div v-if="!companyNamesList?.length" class="company-name__item">
        <p class="company-name__text">Company names is not found</p>
      </div>
    </TheAccordion>
  </div>
</template>
