<script setup lang="ts">
import { raf } from '~/utils/ea'

interface iProps {
  title: string
  additionalButton?: string
  isInputs?: boolean
}

defineProps<iProps>()

const isOpened = ref(false)
const emit = defineEmits(['open', 'action-click'])

const $el = ref<HTMLElement | null>(null)

const calcHeight = () => {
  const height = $el.value?.scrollHeight

  $el.value?.style.setProperty('--h', `${height}px`)
}

const toggleClick = () => {
  isOpened.value = !isOpened.value
}

const optionalClick = () => {
  emit('open')
  emit('action-click')
}

onMounted(() => {
  raf.on(calcHeight)

  isOpened.value = true
})

onBeforeUnmount(() => {
  raf.off(calcHeight)
})
</script>

<template>
  <div class="accordion" :class="isOpened && 'accordion--opened'">
    <div class="accordion__wrapper">
      <div class="accordion__header">
        <button
          type="button"
          class="accordion__btn accordion__main-btn"
          @click="toggleClick"
        >
          {{ title }}
          <IconsSelectionArrowDown />
        </button>
        <OptionalButton v-if="additionalButton" @click="optionalClick">
          {{ additionalButton }}
        </OptionalButton>
      </div>
      <div
        ref="$el"
        class="accordion__content-wrapper"
        :class="isInputs && 'accordion__content-wrapper--inputs'"
      >
        <div class="accordion__content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
