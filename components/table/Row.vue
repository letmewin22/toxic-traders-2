<script setup lang="ts">
interface iProps {
  link?: {
    url: string
  }
}

defineProps<iProps>()
</script>

<template>
  <nuxt-link v-if="link" :to="link.url" class="table-row table-row--link">
    <slot />
  </nuxt-link>
  <div v-else class="table-row">
    <slot />
  </div>
</template>
