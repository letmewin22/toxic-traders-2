<script setup lang="ts">
interface iProps {
  variant: 'fill' | 'outlined'
  text: string
  isButton?: boolean
}

defineProps<iProps>()

const emit = defineEmits(['close'])

const onClick = () => {
  emit('close')
}
</script>

<template>
  <button
    class="badge"
    :class="[`badge--${variant}`]"
    :disabled="!isButton"
    @click="onClick"
  >
    <slot name="icon" />
    <span class="badge__text"> {{ text }}</span>
    <span v-if="isButton" class="badge__close">
      <IconsClose />
    </span>
  </button>
</template>
