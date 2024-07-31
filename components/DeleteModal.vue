<script lang="ts" setup>
interface iProps {
  modalOpened: boolean
  text?: string
}

defineProps<iProps>()

const emit = defineEmits(['close', 'delete'])
</script>

<template>
  <TheModal
    class-name="delete-modal"
    :modal-opened="modalOpened"
    title="Delete confirmation"
    @close="emit('close')"
  >
    <div class="delete-modal__modal-wrapper">
      <p class="delete-modal__delete-text">
        {{
          text ??
          'Are you sure you want to delete this item? This action cannot be prevented'
        }}
      </p>
      <div class="delete-modal__modal-btn-wrapper">
        <TheButton
          class="delete-modal__modal-btn"
          tag="button"
          variant="close"
          button-size="medium"
          @click="emit('close')"
        >
          Cancel
        </TheButton>
        <TheButton
          class="delete-modal__modal-btn"
          tag="button"
          variant="danger"
          button-size="medium"
          @click="emit('delete')"
        >
          Delete
        </TheButton>
      </div>
    </div>
  </TheModal>
</template>
