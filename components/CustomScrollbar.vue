<script lang="ts" setup>
interface iProps {
  axis?: 'x' | 'y'
}

withDefaults(defineProps<iProps>(), {
  axis: 'y',
})

const $scrollbar = ref<HTMLElement | null>(null)
const $thumb = ref<HTMLElement | null>(null)

// onMounted(() => {
//   const $parent = $scrollbar.value.parentElement as HTMLElement
// })
</script>

<template>
  <div
    ref="$scrollbar"
    class="scrollbar"
    :class="`scrollbar--${axis}`"
    :style="{ display: 'none' }"
  >
    <div ref="$thumb" class="scrollbar__thumb"></div>
  </div>
</template>
