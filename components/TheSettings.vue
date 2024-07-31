<script setup lang="ts">
interface iProps {
  properties: string[]
}

const props = defineProps<iProps>()

const emit = defineEmits(['change'])

const searchInput = reactive({
  required: false,
  id: 'settings-search',
  name: 'Settings search',
  type: 'text',
  value: '',
  placeholder: 'Search property',
  disabled: false,
  isRightButton: true,
})

const checkboxList = ref([])

const selectedCheckboxItems = ref<string[]>([])

watch(
  () => props.properties,
  () => {
    checkboxList.value = props.properties.map(property => ({
      value: formatNameToNormalCase(property),
      id: property,
      name: 'settings-checkboxes',
      type: 'checkbox',
      disabled: false,
      checked: true,
      isShow: true,
    }))
  }
)

const onChange = (inputData: iInputData) => {
  checkboxList.value = checkboxList.value.map(item => {
    if (item.value.toLowerCase().includes(inputData.value.toLowerCase())) {
      return {
        ...item,
        isShow: true,
      }
    }

    return {
      ...item,
      isShow: false,
    }
  })
}

const selectAllItems = () => {
  checkboxList.value = checkboxList.value.map(item => {
    return {
      ...item,
      checked: true,
    }
  })
}

const onChangeCheckbox = (val: string, checked: boolean) => {
  checkboxList.value = checkboxList.value.map(item => {
    if (item.value === val) {
      return {
        ...item,
        checked,
      }
    }

    return item
  })
}

watch(
  () => checkboxList.value,
  () => {
    selectedCheckboxItems.value = checkboxList.value
      .filter(item => item.checked)
      .map(item => item.id)

    emit('change', selectedCheckboxItems.value)
  },
  { deep: true }
)
</script>

<template>
  <div class="settings">
    <div class="settings__menu">
      <TheInput
        :id="searchInput.id"
        :required="searchInput.required"
        :name="searchInput.name"
        :type="searchInput.type"
        :placeholder="searchInput.placeholder"
        :disabled="searchInput.disabled"
        :is-right-button="searchInput.isRightButton"
        class="settings__search-input"
        @input-value="onChange"
      >
        <template #right-icon>
          <IconsSearch />
        </template>
      </TheInput>
      <TheButton
        tag="button"
        button-size="small"
        variant="outlined"
        @click="selectAllItems"
      >
        Select all
        <template #start-icon>
          <IconsDoubleCheck />
        </template>
      </TheButton>
    </div>
    <div class="settings__content">
      <CheckboxInput
        v-for="(item, idx) in checkboxList"
        v-show="item.isShow"
        :id="item.id"
        :key="idx"
        :value="item.value"
        :name="item.name"
        :type="item.type"
        :disabled="item.disabled"
        :checked="item.checked"
        @input-value="onChangeCheckbox"
      />
    </div>
    <div class="settings__info">
      <p class="settings__info-text">
        Showed properties: {{ selectedCheckboxItems.length }}
      </p>
      <p class="settings__info-text">
        Hidden properties:
        {{ checkboxList.length - selectedCheckboxItems.length }}
      </p>
    </div>
  </div>
</template>
