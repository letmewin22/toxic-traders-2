<script setup lang="ts">
interface iProps {
  id: string
  dropdownList: string[]
  badgesList?: {
    text: string
    icon?: {
      url: string
      alt?: string
    }
  }[]
  badgeVariant: 'fill' | 'outlined'
}

const props = defineProps<iProps>()
const emit = defineEmits(['select', 'remove'])

const inputValue = ref('')
const inputWidth = ref(1)
const dropdownOpened = ref(false)
const selectedBadge = ref('')
const $el = ref<HTMLElement | null>(null)

const filteredDropdownList = ref(props.dropdownList)

watch(
  () => [props.dropdownList, props.badgesList],
  () => {
    const badgesTexts = props.badgesList?.map(badge => badge.text)

    filteredDropdownList.value = props.dropdownList.filter(
      item => !badgesTexts?.includes(item)
    )
  }
)

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value

  inputWidth.value = target.value?.trim()?.length
}

const onFocus = () => {
  dropdownOpened.value = true
}

const selectDropdownItem = (item: string) => {
  selectedBadge.value = item

  filteredDropdownList.value = filteredDropdownList.value.filter(
    el => el !== item
  )

  emit('select', selectedBadge.value)

  dropdownOpened.value = false

  inputValue.value = ''
}

const removeBadge = (idx: number) => {
  emit('remove', idx)
}

const outsideClick = (event: Event) => {
  if ($el.value && !$el.value.contains(event.target as Node)) {
    dropdownOpened.value = false
  }
}

const updateFilteredList = () => {
  const filteredList = props.dropdownList.filter(item =>
    item.toLowerCase().includes(inputValue.value.toLowerCase())
  )

  filteredDropdownList.value = filteredList.filter(
    item => !selectedBadge.value.includes(item)
  )
}

watch(inputValue, () => {
  updateFilteredList()
})

onMounted(() => {
  document.body.addEventListener('click', outsideClick)
  updateFilteredList()
})

onBeforeUnmount(() => {
  document.body.removeEventListener('click', outsideClick)
})

const onBackSpace = () => {
  if (inputValue.value.length || !props.badgesList.length) return

  removeBadge(props.badgesList.length - 1)
}
</script>

<template>
  <div ref="$el" class="tags-input">
    <div class="tags-input__wrapper">
      <div class="tags-input__content">
        <div class="tags-input__input-field">
          <div class="tags-input__badge-wrapper">
            <TheBadge
              v-for="(badge, idx) in props.badgesList"
              :key="idx"
              class="tags-input__badge"
              :variant="badgeVariant"
              :is-button="true"
              :text="badge?.text"
              @click="removeBadge(idx)"
            >
              <template #icon>
                <img
                  v-if="badge?.icon"
                  :src="badge?.icon?.url"
                  :alt="badge?.icon?.alt"
                />
              </template>
            </TheBadge>
            <input
              :id="id"
              class="tags-input__input"
              type="text"
              name="Tags input"
              :placeholder="!props.badgesList?.length ? 'Type a value' : null"
              autocomplete="off"
              :style="{ '--width': `${inputWidth}ch` }"
              :value="inputValue"
              @focus="onFocus"
              @input="onChange"
              @click="onFocus"
              @keydown.delete="onBackSpace"
            />
          </div>
        </div>
        <ul
          class="tags-input__dropdown"
          :class="dropdownOpened && 'tags-input__dropdown--opened'"
        >
          <li
            v-for="(item, idx) in filteredDropdownList"
            :key="idx"
            class="tags-input__dropdown-item"
            @click="selectDropdownItem(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
