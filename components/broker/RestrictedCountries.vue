<script setup lang="ts">
import { getBrokerRestrictedCountriesList } from '~/api/brokers/brokerRestrictedCountriesList'
import { getCountriesFlag } from '~/api/countries/getCountries'
import type { iCountries } from '~/types/countries/countries'
import getCountriesFullNames from '~/utils/getFullCountriesNames'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const countriesFullNames = ref<iCountries[]>([])
const restrictedCountriesList = ref<string[]>([])
const selectedCountries = ref<number[]>([])

const filteredSelectedCountries = computed(() => {
  return (
    selectedCountries.value?.map(index => countriesFullNames.value[index]) || []
  ).map(item => ({
    text: item?.countryFullName,
    icon: {
      url: item?.countryFlag.url,
      alt: item?.countryFlag.alt,
    },
  }))
})

// watch(filteredSelectedCountries, () => {
//   console.log(filteredSelectedCountries.value)
// })

const {
  createRestrictedCountries,
  getRestrictedCountries,
  updateRestrictedCountries,
} = useBrokerRestrictedCountries()

const getCountriesList = async () => {
  const countriesData = await getRestrictedCountries(props.brokerId)

  selectedCountries.value =
    countriesData?.restrictedCountries?.map(item => item.countryCode) || []
}

const selectCountries = async (country: string) => {
  const countriesIndex = restrictedCountriesList.value.findIndex(
    el => el === country
  )

  selectedCountries.value = [...selectedCountries.value, countriesIndex]
  await createRestrictedCountries(props.brokerId, selectedCountries.value)

  await getCountriesList()
}

const removeCountries = async (index: number) => {
  selectedCountries.value.splice(index, 1)
  await updateRestrictedCountries(props.brokerId, selectedCountries.value)

  await getCountriesList()
}

onMounted(async () => {
  const countriesFlags = await getCountriesFlag()

  const { restrictedCountries } = await getBrokerRestrictedCountriesList()

  restrictedCountriesList.value = restrictedCountries // ['USA', 'UK', 'Canada']

  countriesFullNames.value = getCountriesFullNames(
    restrictedCountriesList.value,
    countriesFlags
  )

  restrictedCountriesList.value = countriesFullNames.value.map(
    item => item.countryFullName
  )

  await getCountriesList()
})
</script>

<template>
  <div class="restricted-countries">
    <TheAccordion
      class="restricted-countries__accordion"
      title="Restricted countries"
    >
      <TagsInput
        id="restricted-countries"
        :dropdown-list="restrictedCountriesList"
        :badges-list="filteredSelectedCountries"
        badge-variant="outlined"
        @select="selectCountries"
        @remove="removeCountries"
      />
    </TheAccordion>
  </div>
</template>
