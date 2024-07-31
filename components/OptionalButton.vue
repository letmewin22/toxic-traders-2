<script setup lang="ts">
const emit = defineEmits(['onClick'])
</script>

<template>
  <button class="optional-button" @click="emit('onClick')">
    <slot />
  </button>
</template>
