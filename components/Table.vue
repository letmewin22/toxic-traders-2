<script lang="ts" setup>
import { resize } from '~/utils/ea'

interface iProps {
  withLog?: boolean
}

const props = defineProps<iProps>()

const $table = ref<HTMLElement | null>(null)
const isFullWidth = ref(false)
const observer = ref<MutationObserver>(null)

const detectTableWidth = () => {
  const $tableWrapper = $table.value.querySelector(
    '.table__wrapper'
  ) as HTMLElement

  const containerWidth = $table.value.offsetWidth
  const bodyWidth = $tableWrapper.scrollWidth

  isFullWidth.value = bodyWidth <= containerWidth

  // if (props.withLog) {
  //   console.log('containerWidth:', containerWidth, 'bodyWidth:', bodyWidth)
  // }
}

onMounted(() => {
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  }

  resize.on(detectTableWidth)

  observer.value = new MutationObserver(detectTableWidth)

  observer.value.observe($table.value, config)
})

onBeforeUnmount(() => {
  observer.value?.disconnect()

  resize.off(detectTableWidth)
})
</script>

<template>
  <div ref="$table" class="table" :class="isFullWidth && 'table--full-width'">
    <div class="table__wrapper">
      <slot />
    </div>
    <CustomScrollbar axis="y" />
    <CustomScrollbar axis="x" />
  </div>
</template>
