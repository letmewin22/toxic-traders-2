<template>
  <div class="container toast-container">
    <TransitionGroup name="fade">
      <AppToastItem
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast"
        @close="hide"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { toasts, updateToasts } = useToasts()

const hide = (id: string) => {
  const filteredToasts = toasts.value.filter(toast => toast.id !== id)
  updateToasts(filteredToasts)
}
</script>
