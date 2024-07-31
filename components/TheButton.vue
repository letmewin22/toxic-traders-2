<script setup lang="ts">
interface iProps {
  buttonSize: 'large' | 'medium' | 'small'
  variant: 'fill' | 'outlined' | 'soft' | 'danger' | 'close'
  tag: 'button' | 'a' | 'nuxt-link'
  disabled?: boolean
  href?: string
}

const props = defineProps<iProps>()

const tag = computed(() => {
  if (props.tag === 'nuxt-link') {
    return resolveComponent('NuxtLink')
  } else return props.tag ?? 'button'
})

const to = props.tag === 'nuxt-link' ? props.href : undefined
const href = props.tag === 'a' ? props.href : undefined
</script>

<template>
  <component
    :is="tag"
    class="button"
    :class="[`button--${variant}`, `button--${variant}-${buttonSize}`]"
    :to="to"
    :href="href"
    :target="props.tag === 'a' ? '_blank' : undefined"
    :rel="props.tag === 'a' ? 'noreferer noopener' : undefined"
    :disabled="props.tag === 'button' ? disabled : undefined"
  >
    <slot name="start-icon" />
    <slot />
    <slot name="end-icon" />
  </component>
</template>
