<script lang="ts" setup>
import type { iInput, iSelectInput } from '~/types'
import type { iBrokerReviewsItem } from '~/types/broker/brokerReviews'

interface iProps {
  modalOpened: boolean
  review: iBrokerReviewsItem | null
  services: string[]
}

const props = defineProps<iProps>()

const emit = defineEmits(['close', 'updated'])

const { updateReview } = useBrokerReviews()

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

const reviewsInputs = ref<iReviewsInput[]>([])

watch(
  () => props.review,
  () => {
    reviewsInputs.value = [
      // {
      //   type: 'select',
      //   id: `edit-review-service`,
      //   name: 'service',
      //   options: props.services,
      //   placeholder: 'Choose Service',
      //   value: props.review?.serviceName,
      // },
      {
        required: false,
        id: `edit-review-link`,
        name: 'Link',
        type: 'text',
        value: props.review?.url,
        placeholder: 'Link',
      },
      {
        required: false,
        id: `edit-review-count`,
        name: 'Reviews count',
        type: 'number',
        value: props.review?.numberOfReviews?.toString(),
        placeholder: 'Reviews count',
      },
      {
        required: false,
        id: `edit-review-rating`,
        name: 'Rating',
        type: 'number',
        value: props.review?.rating?.toString(),
        placeholder: 'Rating from 0 to 5',
        min: 0,
        max: 5,
      },
    ]
  }
)

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

const onUpdateClick = async () => {
  const serviceName = props.review?.serviceName

  const url = reviewsInputs.value.find(el => el.name === 'Link').value

  const numberOfReviews = +reviewsInputs.value.find(
    el => el.name === 'Reviews count'
  ).value

  const rating = +reviewsInputs.value.find(el => el.name === 'Rating').value

  const id = props.review?.id

  await updateReview(id, serviceName, url, rating, numberOfReviews)

  resetInputs()

  emit('updated')
  emit('close')
}

const reviewsModalClose = () => {
  emit('close')
}
</script>

<template>
  <TheModal
    :modal-opened="modalOpened"
    title="Edit review"
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
        :options="input.options"
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
        :value="input.value?.toString()"
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
        @click="onUpdateClick"
      >
        Update
      </TheButton>
    </div>
  </TheModal>
</template>
