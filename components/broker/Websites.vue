<script setup lang="ts">
import type { iCompanyNamesItem } from '~/types/broker/brokerCompanyNames'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const companyNamesList = ref<iCompanyNamesItem[]>([])
const filteredCompanyNamesList = ref([])

const { getCompanyNamesById } = useBrokerCompanyNames()

const showMoreServerAddresses = () => {
  filteredCompanyNamesList.value = companyNamesList.value
}

const showLessServerAddresses = () => {
  filteredCompanyNamesList.value = companyNamesList.value.slice(0, 3)
}

onMounted(async () => {
  const companyNamesRequest = await getCompanyNamesById(props.brokerId)

  companyNamesList.value = companyNamesRequest?.companyNames?.filter(
    item => item.website
  )

  filteredCompanyNamesList.value = companyNamesList.value

  showLessServerAddresses()
})
</script>

<template>
  <div class="websites">
    <TheAccordion title="Websites" :is-inputs="true">
      <div
        v-for="(item, idx) in filteredCompanyNamesList"
        :key="idx"
        class="websites__item"
      >
        <div class="websites__info-item">
          <IconsInfoCircle />
          <div class="websites__info-modal">
            <p class="websites__info-text">Website created date</p>
          </div>
        </div>
        <div class="websites__text-wrapper">
          <p class="websites__text">{{ item.website }}</p>
        </div>
      </div>
      <div
        v-if="!filteredCompanyNamesList.length"
        class="websites__text-wrapper"
      >
        <p class="websites__text">Websites not found</p>
      </div>
      <OptionalButton
        v-if="
          companyNamesList.length > 3 &&
          filteredCompanyNamesList.length !== companyNamesList.length
        "
        @on-click="showMoreServerAddresses"
        >Show more</OptionalButton
      >
      <OptionalButton
        v-if="filteredCompanyNamesList.length > 3"
        @on-click="showLessServerAddresses"
        >Show less</OptionalButton
      >
    </TheAccordion>
  </div>
</template>
