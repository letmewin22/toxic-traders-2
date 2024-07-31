<script setup lang="ts">
interface IProps {
  modalOpened: boolean
  title?: string
  className?: string
}

defineProps<IProps>()

const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
  document.body.classList.remove('modal-open')
}
</script>

<template>
  <Teleport to="body">
    <div
      class="sliding-modal"
      :class="[modalOpened && 'sliding-modal--opened', className]"
    >
      <div class="sliding-modal__backdrop" @click="onClose" />
      <div class="sliding-modal__content">
        <div class="sliding-modal__header">
          <p v-if="title" class="sliding-modal__title">
            {{ title }}
          </p>
          <button class="sliding-modal__close-btn" @click="onClose">
            <span class="sliding-modal__close-line" />
            <span class="sliding-modal__close-line" />
          </button>
        </div>
        <div class="sliding-modal__container">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
