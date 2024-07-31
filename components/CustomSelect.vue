<script setup lang="ts">
import type { iInput, iSearchInput } from '~/types'

interface iProps {
  options: string[]
  placeholder: string
  title?: string
  searchInput?: iSearchInput
  id?: string
  name?: string
  value?: string
}

const props = defineProps<iProps>()

const $el = ref<HTMLElement | null>(null)
const isOpened = ref(false)
const selectedItem = ref(props.value ?? '')

watch(
  () => props.value,
  () => {
    selectedItem.value = props.value
  }
)

const emit = defineEmits(['select', 'search'])

const toggleList = () => {
  isOpened.value = !isOpened.value
}

const closeList = (option = '') => {
  isOpened.value = false
  selectedItem.value = option
  emit('select', option, { id: props.id, value: option })
}

const outsideClick = event => {
  if (!$el.value.contains(event.target)) {
    isOpened.value = false
  }
}

const onSearch = (input: iInput) => {
  emit('search', input.value)
}

onMounted(() => {
  document.body.addEventListener('click', outsideClick)
})

onUnmounted(() => {
  document.body.removeEventListener('click', outsideClick)
})
</script>

<template>
  <div
    :id="id"
    ref="$el"
    :name="name"
    class="custom-select"
    :class="isOpened && 'custom-select--opened'"
  >
    <p v-if="title" class="custom-select__title">{{ title }}</p>
    <div class="custom-select__selected" @click="toggleList">
      <p class="custom-select__text">
        {{ selectedItem || placeholder }}
      </p>

      <div class="custom-select-icon">
        <slot name="select-icon" />
        <IconsSelectionArrowDown class="custom-select__arrow" />
      </div>
    </div>
    <div
      class="custom-select__content"
      :class="title && 'custom-select__content--with-title'"
      @click.stop
    >
      <div v-if="searchInput" class="custom-select__input-wrapper">
        <TheInput
          :id="searchInput.id"
          :required="searchInput.required"
          :name="searchInput.name"
          :type="searchInput.type"
          :placeholder="searchInput.placeholder"
          :is-right-button="searchInput.isRightButton"
          class="custom-select__input"
          @input-value="onSearch"
        >
          <template #right-icon>
            <IconsSearch />
          </template>
        </TheInput>
      </div>

      <ul class="custom-select__list">
        <li
          v-if="!options.length"
          class="custom-select__item"
          @click="closeList()"
        >
          <p class="custom-select__item-text">Options not found</p>
        </li>
        <li
          v-for="(option, idx) of options"
          v-else
          :key="idx"
          class="custom-select__item"
          @click="closeList(option)"
        >
          <p class="custom-select__item-text">
            {{ option }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
