<script setup lang="ts">
interface iProps {
  brokerId: number
  websiteId: number | null
}

const props = defineProps<iProps>()

const { getStatisticProviders, getCurrentStatisticTraffic } =
  useBrokerStatistic()

const ahrefsRequestData = ref(null)
const semrushRequestData = ref(null)
const similarWebRequestData = ref(null)

const headerFields = ref([])

const ahrefsTraffic = computed(() => {
  return (
    ahrefsRequestData.value?.companyNamesTraffic.find(
      item => item.companyName.id === props.websiteId
    )?.traffic || 'N/A'
  )
})

const semrushTraffic = computed(() => {
  return (
    semrushRequestData.value?.companyNamesTraffic.find(
      item => item.companyName.id === props.websiteId
    )?.traffic || 'N/A'
  )
})

const similarWebTraffic = computed(() => {
  return (
    similarWebRequestData.value?.companyNamesTraffic.find(
      item => item.companyName.id === props.websiteId
    )?.traffic || 'N/A'
  )
})

onMounted(async () => {
  const { providerNames } = await getStatisticProviders()

  ahrefsRequestData.value = await getCurrentStatisticTraffic(
    'Ahrefs',
    props.brokerId
  )

  semrushRequestData.value = await getCurrentStatisticTraffic(
    'Semrush',
    props.brokerId
  )

  similarWebRequestData.value = await getCurrentStatisticTraffic(
    'SimilarWeb',
    props.brokerId
  )

  headerFields.value = providerNames
})
</script>

<template>
  <div class="statistics-table">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell
            v-for="(headerItem, idx) in headerFields"
            :key="idx"
            :item="headerItem"
            :class="`table-cell--${idx}`"
          />
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell :item="formatNumber(ahrefsTraffic)" />
          <TableCell :item="formatNumber(semrushTraffic)" />
          <TableCell :item="formatNumber(similarWebTraffic)" />
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
