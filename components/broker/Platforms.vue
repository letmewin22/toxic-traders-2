<script setup lang="ts">
import { getBrokerPlatformsList } from '~/api/brokers/brokerPlatformsList'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const platformsFullList = ref<string[]>([])
const platformsList = ref<number[]>([])
const filteredPlatformsList = computed(() => {
  return removeUnderlines(
    platformsList.value?.map(index => platformsFullList.value[index]) || []
  ).map(item => ({ text: item }))
})

const { createPlatform, getPlatform, updatePlatform } = useBrokerPlatforms()

const getPlatformList = async () => {
  const platformsData = await getPlatform(props.brokerId)
  platformsList.value =
    platformsData?.platforms?.map(item => item.platform) || []
}

const selectPlatform = async (platform: string) => {
  const platformIndex = platformsFullList.value.findIndex(el => el === platform)

  platformsList.value.push(platformIndex)
  await createPlatform(props.brokerId, platformsList.value)

  await getPlatformList()
}

const removePlatform = async (index: number) => {
  platformsList.value.splice(index, 1)
  await updatePlatform(props.brokerId, platformsList.value)

  await getPlatformList()
}

onMounted(async () => {
  const data = await getBrokerPlatformsList()

  platformsFullList.value = removeUnderlines(Object.values(data))

  await getPlatformList()
})
</script>

<template>
  <div class="platforms">
    <TheAccordion class="platforms__accordion" title="Platforms">
      <TagsInput
        id="platforms"
        :dropdown-list="platformsFullList"
        :badges-list="filteredPlatformsList"
        badge-variant="fill"
        @select="selectPlatform"
        @remove="removePlatform"
      />
    </TheAccordion>
  </div>
</template>
