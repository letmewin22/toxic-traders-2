<script setup lang="ts">
import gsap from 'gsap'

interface iProps {
  toast: iToast
}

const props = defineProps<iProps>()
const emit = defineEmits(['close'])

const $progress = ref(null)

const onClose = (id: string) => {
  emit('close', id)
}

onMounted(() => {
  setTimeout(() => {
    gsap.to($progress.value, {
      duration: 5,
      width: '100%',
      ease: 'linear',
      onComplete: () => {
        onClose(props.toast.id)
      },
    })
  }, 0)
})
</script>

<template>
  <div class="toast" :class="`toast--${toast.color}`">
    <div ref="$progress" class="toast__progress" />
    <span
      v-if="toast.color === 'danger' || toast.color === 'warning'"
      class="toast__icon"
    >
      <IconsDanger />
    </span>
    <p class="toast__text">
      {{ toast.text }}
    </p>
    <button class="toast__close-btn" @click.prevent="onClose(toast.id)">
      <span class="toast__close-line" />
      <span class="toast__close-line" />
    </button>
  </div>
</template>
