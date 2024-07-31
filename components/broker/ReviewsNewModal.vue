<script lang="ts" setup>
import type { iInput, iSelectInput } from '~/types'
import type { iBrokerReviewsItem } from '~/types/broker/brokerReviews'

interface iProps {
  modalOpened: boolean
  brokerId: number
  services: string[]
  reviewsList: iBrokerReviewsItem[]
}

const props = defineProps<iProps>()

const emit = defineEmits(['close', 'created'])

const { createReview } = useBrokerReviews()

interface iReviewsInput {
  required?: boolean
  id: string
  name: string
  type?: string
  value: string
  placeholder: string
  min?: number
  max?: number
  title?: string
  options?: string[]
}

const reviewsInputs = ref<iReviewsInput[]>([
  {
    type: 'select',
    id: `review-service`,
    name: 'service',
    placeholder: 'Choose Service',
    value: '',
  },
  {
    required: false,
    id: `review-link`,
    name: 'Link',
    type: 'text',
    value: '',
    placeholder: 'Link',
  },
  {
    required: false,
    id: `review-count`,
    name: 'Reviews count',
    type: 'number',
    value: '',
    placeholder: 'Reviews count',
  },
  {
    required: false,
    id: `review-rating`,
    name: 'Rating',
    type: 'number',
    value: '',
    placeholder: 'Rating from 0 to 5',
    min: 0,
    max: 5,
  },
])

const onInputChange = (e: iInput) => {
  reviewsInputs.value = reviewsInputs.value.map(item => {
    if (item.id === e.id) {
      item.value = e.value
    }
    return item
  })
}

const onSelectChange = (_: string, e: iSelectInput) => {
  reviewsInputs.value = reviewsInputs.value.map(item => {
    if (item.id === e.id) {
      item.value = e.value
    }
    return item
  })
}

const resetInputs = () => {
  reviewsInputs.value = reviewsInputs.value.map(item => {
    item.value = ''
    return item
  })
}

const onAddClick = async () => {
  const serviceName = reviewsInputs.value.find(
    el => el.name === 'service'
  ).value

  const url = reviewsInputs.value.find(el => el.name === 'Link').value

  const numberOfReviews = +reviewsInputs.value.find(
    el => el.name === 'Reviews count'
  ).value

  const rating = +reviewsInputs.value.find(el => el.name === 'Rating').value

  await createReview(props.brokerId, url, rating, numberOfReviews, serviceName)

  resetInputs()

  emit('created')
  emit('close')
}

const reviewsModalClose = () => {
  emit('close')
}

const availableServices = computed(() => {
  const allReviewsServices = props.reviewsList?.map(item =>
    item.serviceName.toLowerCase()
  )

  return props.services.filter(
    service => !allReviewsServices?.includes(service.toLowerCase())
  )
})
</script>

<template>
  <TheModal
    :modal-opened="modalOpened"
    title="Add new review"
    @close="reviewsModalClose"
  >
    <div
      v-for="(input, index) in reviewsInputs"
      :key="index"
      class="review__input-item"
    >
      <CustomSelect
        v-if="input.type === 'select'"
        :id="input.id"
        :name="input.name"
        :options="availableServices"
        :placeholder="input.placeholder"
        :value="input.value"
        @select="onSelectChange"
      />
      <TheInput
        v-else
        :id="input.id"
        :key="index"
        :required="input.required"
        :name="input.name"
        :type="input.type"
        :placeholder="input.placeholder"
        :value="input.value.toString()"
        :min="input.min"
        :max="input.max"
        @input-value="onInputChange"
      />
    </div>
    <div class="reviews__buttons">
      <TheButton
        tag="button"
        variant="close"
        button-size="medium"
        @click="reviewsModalClose"
      >
        Close
      </TheButton>
      <TheButton
        tag="button"
        variant="fill"
        button-size="medium"
        @click="onAddClick"
      >
        Add
      </TheButton>
    </div>
  </TheModal>
</template>
