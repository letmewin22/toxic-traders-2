<script setup lang="ts">
interface iProps {
  reviewId: number
  rating?: number
  reviewsCount?: number
  reviewLink?: string
}

const props = defineProps<iProps>()

const emit = defineEmits(['openMenu', 'edit', 'delete'])
const $el = ref<HTMLElement | null>(null)

const filledStars = computed(() => {
  return props.rating > 0 ? props.rating : 0
})

const menuOpened = ref(false)

const toggleMenu = () => {
  menuOpened.value = !menuOpened.value
  emit('openMenu')
}

const outsideClick = event => {
  if (!$el.value.contains(event.target)) {
    menuOpened.value = false
  }
}

onMounted(() => {
  document.body.addEventListener('click', outsideClick)
})

onUnmounted(() => {
  document.body.removeEventListener('click', outsideClick)
})
</script>

<template>
  <a
    :href="reviewLink"
    target="_blank"
    rel="noreferer noopener"
    class="reviews-item"
  >
    <div class="reviews-item__rating-wrapper">
      <div class="reviews-item__rating">
        <slot />
        <p class="reviews-item__rating-text">
          {{ rating.toFixed(1) || '0.0' }}
        </p>
      </div>
      <ul class="reviews-item__list">
        <li v-for="(_, idx) in 5" :key="idx" class="reviews-item__star">
          <IconsStar v-if="idx >= filledStars" />
          <IconsFilledStar v-else />
        </li>
      </ul>
      <button
        class="reviews-item__btn-wrapper"
        @click.prevent="toggleMenu"
        @click.stop
      >
        <div class="reviews-item__btn">
          <span />
          <span />
          <span />
        </div>
      </button>
    </div>
    <p class="reviews-item__count">{{ reviewsCount || 0 }} reviews</p>
    <div
      ref="$el"
      class="reviews-item__menu"
      :class="menuOpened && 'reviews-item__menu--opened'"
      @click.stop
      @click.prevent
    >
      <div class="reviews-item__menu-wrapper">
        <button
          class="reviews-item__menu-btn"
          @click.stop="emit('edit', reviewId)"
          @click.prevent
        >
          <IconsEdit />
          Edit
        </button>
        <button
          class="reviews-item__menu-btn"
          @click.stop="emit('delete', reviewId)"
          @click.prevent
        >
          <IconsTrash />
          Delete
        </button>
      </div>
    </div>
  </a>
</template>
