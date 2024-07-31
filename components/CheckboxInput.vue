<script setup lang="ts">
interface iProps {
  id: string
  value: string
  name: string
  type?: string
  disabled?: boolean
  checked?: boolean
}

const props = defineProps<iProps>()

const emit = defineEmits(['inputValue'])

const isChecked = ref(props.checked ?? false)

watch(
  () => props.checked,
  () => {
    isChecked.value = props.checked
  }
)
</script>

<template>
  <label
    :for="id"
    class="checkbox-input"
    :class="disabled && 'checkbox-input--disabled'"
  >
    <span class="checkbox-input__text">
      {{ value }}
    </span>
    <input
      :id="id"
      v-model="isChecked"
      :type="type"
      :name="name"
      :value="value"
      :disabled="disabled"
      class="checkbox-input__type"
      :checked="isChecked"
      @change="emit('inputValue', value, isChecked)"
    />
    <span class="checkbox-input__checkmark">
      <IconsCheck />
    </span>
  </label>
</template>
