<script setup lang="ts">
import type { iInput } from '~/types'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const locationServer = ref<string>('')
const locationServerValue = ref<string>('')
const { getServerLocation, createServerLocation, deleteServerLocation } =
  useBrokerServerLocation()

const locationInputData = ref({
  required: false,
  id: 'location',
  name: 'Location',
  type: 'text',
  value: locationServer,
  placeholder: 'Enter server location',
})

const onClickEnter = async () => {
  if (!locationServerValue.value) {
    await deleteServerLocation(props.brokerId)
  } else {
    await createServerLocation(props.brokerId, locationServerValue.value)
  }
}

const onChange = (input: iInput) => {
  locationServerValue.value = input.value
}

const onBlur = async () => {
  if (!locationServerValue.value) {
    await deleteServerLocation(props.brokerId)
  } else {
    await createServerLocation(props.brokerId, locationServerValue.value)
  }
}

onMounted(async () => {
  const locationServerData = await getServerLocation(props.brokerId)

  locationServer.value = locationServerData || ''
})
</script>

<template>
  <form
    class="server-location"
    novalidate
    @keypress.enter.prevent="onClickEnter"
  >
    <div class="server-location__wrapper">
      <TheAccordion title="Location Servers" :is-inputs="true">
        <TheInput
          :id="locationInputData?.id"
          :required="locationInputData?.required"
          :name="locationInputData?.name"
          :type="locationInputData?.type"
          :placeholder="locationInputData?.placeholder"
          :value="locationInputData?.value"
          @input-value="onChange"
          @input-blur="onBlur"
        />
      </TheAccordion>
    </div>
  </form>
</template>
