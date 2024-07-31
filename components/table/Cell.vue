<script setup lang="ts">
interface iProps {
  item: string | number | null
  link?: {
    text: string
    url: string
  }
  isSort?: boolean
  isModal?: boolean
  sortOrder?: 1 | 2
  isActive?: boolean
  customComponent?: Component
}

const props = withDefaults(defineProps<iProps>(), {
  link: null,
})

const emit = defineEmits(['sort', 'open', 'clickCustomComponent'])

const onSort = () => {
  emit('sort', props.item)
}
</script>

<template>
  <div class="table-cell">
    <NuxtLink
      v-if="link && link?.text?.length"
      :to="link!.url"
      class="table-cell__link"
    >
      <span> {{ link!.text }} </span>
      <IconsLinkArrow />
    </NuxtLink>
    <button v-else-if="isSort" class="table-cell__btn" @click="onSort">
      {{ item }}
      <IconsDownArrow v-if="sortOrder === 1 && isActive" />
      <IconsUpArrow v-else-if="sortOrder === 2 && isActive" />
      <IconsDownUpArrow v-else />
    </button>
    <button
      v-else-if="isModal && item"
      class="table-cell__modal-btn"
      @click="emit('open')"
    >
      {{ item }}
      <IconsLinkArrow />
    </button>
    <button
      v-else-if="customComponent"
      class="table-cell__img-btn"
      @click="emit('clickCustomComponent')"
    >
      <component :is="props.customComponent" />
    </button>
    <p v-else class="table-cell__text">
      {{ item }}
    </p>
  </div>
</template>
