<script setup lang="ts">
interface iProps {
  id: string
  option: string
  name: string
  type?: string
  disabled?: boolean
}

defineProps<iProps>()

const emit = defineEmits(['inputValue'])
</script>

<template>
  <label
    :for="option"
    class="radio-input"
    :class="disabled && 'radio-input--disabled'"
  >
    <span class="radio-input__text">
      {{ option }}
    </span>
    <input
      :id="id"
      :type="type"
      :name="name"
      :value="option"
      :disabled="disabled"
      class="radio-input__type"
      @change="emit('inputValue', option)"
    />
    <span class="radio-input__checkmark" />
  </label>
</template>
