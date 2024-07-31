<script setup lang="ts">
import { raf } from '~/utils/ea'

interface IProps {
  modalOpened: boolean
  title?: string
  className?: string
}

const props = defineProps<IProps>()

const $modal = ref<HTMLElement | null>(null)
const $modalContainer = ref<HTMLElement | null>(null)
const isFullHeight = ref(false)

const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
  document.body.classList.remove('modal-open')
}

const detectModalContentHeight = () => {
  const wh = window.innerHeight
  const modalContentHeight = $modalContainer.value.scrollHeight

  isFullHeight.value = modalContentHeight >= wh
}

watch(
  () => props.modalOpened,
  () => {
    if (props.modalOpened) {
      raf.on(detectModalContentHeight)
    }
  }
)

onBeforeUnmount(() => {
  raf.off(detectModalContentHeight)
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="$modal"
      class="modal"
      :class="[modalOpened && 'modal--opened', className]"
    >
      <div class="modal__backdrop" @click="onClose" />
      <div
        class="modal__content"
        :class="isFullHeight && 'modal__content--full-height'"
      >
        <div class="modal__header">
          <p v-if="title" class="modal__title">
            {{ title }}
          </p>
          <button class="modal__close-btn" @click="onClose">
            <span class="modal__close-line" />
            <span class="modal__close-line" />
          </button>
        </div>
        <div ref="$modalContainer" class="modal__container">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
