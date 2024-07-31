<script setup lang="ts">
import type { iBrokerReviewsItem } from '~/types/broker/brokerReviews'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const services = ['Trustpilot', 'ForexPeaceArmy', 'Wikifx', 'Fx123']

const { deleteReview, getReviews } = useBrokerReviews()
const createModalOpened = ref(false)
const editModalOpened = ref(false)
const deleteModalOpened = ref(false)
const reviewsList = ref<iBrokerReviewsItem[]>([])
const IdToDelete = ref(null)
const reviewToUpdate = ref(null)

const createModalOpen = () => {
  createModalOpened.value = true
  document.body.classList.add('modal-open')
}

const createModalClose = () => {
  createModalOpened.value = false
  document.body.classList.remove('modal-open')
}

const editModalOpen = (reviewId: number) => {
  reviewToUpdate.value = reviewsList.value.find(item => item.id === reviewId)
  console.log(reviewToUpdate.value)

  editModalOpened.value = true
  document.body.classList.add('modal-open')
}

const editModalClose = () => {
  editModalOpened.value = false
  document.body.classList.remove('modal-open')
}

const deleteModalOpen = (reviewId: number) => {
  IdToDelete.value = reviewId
  deleteModalOpened.value = true
  document.body.classList.add('modal-open')
}

const deleteModalClose = () => {
  IdToDelete.value = null

  deleteModalOpened.value = false

  document.body.classList.remove('modal-open')
}

const fetchReviews = async () => {
  const data = await getReviews(props.brokerId)

  reviewsList.value = data || []
}

const onCreateReview = async () => {
  await fetchReviews()
}

const onEditReview = async () => {
  await fetchReviews()
}

const onDeleteReview = async () => {
  await deleteReview(IdToDelete.value)
  await fetchReviews()
  deleteModalClose()
}

onMounted(async () => {
  await fetchReviews()
})
</script>

<template>
  <div class="reviews">
    <TheAccordion
      title="Reviews"
      :additional-button="reviewsList?.length >= 4 ? null : 'Add new'"
      @open="createModalOpen"
    >
      <div v-if="reviewsList?.length" class="reviews__content">
        <BrokerReviewsItem
          v-for="(item, idx) in reviewsList"
          :key="idx"
          :review-id="item?.id"
          :rating="item?.rating"
          :reviews-count="item?.numberOfReviews"
          :review-link="item?.url"
          @edit="editModalOpen"
          @delete="deleteModalOpen"
        >
          <IconsReviewsForexPeaceArmy
            v-if="item?.serviceName.toLowerCase() === 'forexpeacearmy'"
          />
          <IconsReviewsTrustpilot
            v-if="item?.serviceName.toLowerCase() === 'trustpilot'"
          />
          <IconsReviewsWikifx
            v-if="item?.serviceName.toLowerCase() === 'wikifx'"
          />
          <IconsReviewsFx123
            v-if="item?.serviceName.toLowerCase() === 'forexratings'"
          />
        </BrokerReviewsItem>
      </div>

      <div v-else class="reviews__content">
        <p class="reviews__content-text">No reviews yet</p>
      </div>
    </TheAccordion>
    <BrokerReviewsNewModal
      :broker-id="props.brokerId"
      :services="services"
      :reviews-list="reviewsList"
      :modal-opened="createModalOpened"
      @close="createModalClose"
      @created="onCreateReview"
    />
    <BrokerReviewsEditModal
      :review="reviewToUpdate"
      :services="services"
      :modal-opened="editModalOpened"
      @close="editModalClose"
      @updated="onEditReview"
    />
    <DeleteModal
      :modal-opened="deleteModalOpened"
      @close="deleteModalClose"
      @delete="onDeleteReview"
    />
  </div>
</template>
