<script setup lang="ts">
import type { iLink } from '~/types'

interface iProps {
  title: string | number
  img?: { url: string; alt: string }
  link?: iLink
  text?: string | number
  additionalText?: string | number | iLink
}

defineProps<iProps>()
</script>

<template>
  <div class="statistics-item">
    <div class="statistics-item__title-wrapper">
      <img
        v-if="img"
        class="statistics-item__img"
        :src="img.url"
        :alt="img.alt"
      />
      <h4 class="statistics-item__title">
        {{ title }}
      </h4>
    </div>
    <a
      v-if="link"
      :href="link?.url"
      class="statistics-item__text statistics-item__text--link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ link?.text }}
    </a>
    <p v-else class="statistics-item__text">
      {{ text || 'N/A' }}
    </p>
    <p v-if="additionalText" class="statistics-item__text">
      {{ additionalText || null }}
    </p>
  </div>
</template>
