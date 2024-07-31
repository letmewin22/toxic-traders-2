<script setup lang="ts">
interface iProps {
  required?: boolean
  id: string
  title?: string
  name: string
  type?: string
  validation?: string
  validationText?: string
  error?: boolean
  placeholder?: string
  disabled?: boolean
  isLeftButton?: boolean
  isRightButton?: boolean
  value?: string
  min?: number
  max?: number
}

const props = defineProps<iProps>()

const emit = defineEmits([
  'inputValue',
  'inputFocus',
  'inputBlur',
  'rightClick',
  'leftClick',
])

const {
  inputValue,
  inputBlur,
  error,
  $input,
  onFocus,
  onBlur,
  onInput,
  reset,
  throwError,
  inputType,
  onPasswordVisibilityChange,
} = useInput(emit, props)

defineExpose({
  throwError,
  reset,
})

const onRightClick = () => {
  emit('rightClick')

  if (props.type === 'password') {
    onPasswordVisibilityChange()
  }
}

const onLeftClick = () => {
  emit('leftClick')
}
</script>

<template>
  <label
    class="input"
    :class="[
      type === 'textarea' && 'input--textarea',
      type === 'select' && 'input--select',
      inputBlur && 'js-focus',
    ]"
    :for="id"
  >
    <span v-if="title" class="input__title"
      >{{ title }} <span v-if="required === true">*</span>
    </span>
    <div class="input__wrapper">
      <input
        v-if="type === 'number'"
        :id="id"
        ref="$input"
        v-model="inputValue"
        class="input__type"
        :class="error && 'input__type--error'"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="min"
        :max="max"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />

      <textarea
        v-else-if="type === 'textarea'"
        :id="id"
        ref="$input"
        v-model="inputValue"
        class="input__type"
        :class="[
          error && 'input__type--error',
          isLeftButton && 'input__type--left-btn',
          isRightButton && 'input__type--right-btn',
        ]"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />

      <input
        v-else
        :id="id"
        ref="$input"
        v-model="inputValue"
        class="input__type"
        :class="[
          error && 'input__type--error',
          isLeftButton && 'input__type--left-btn',
          isRightButton && 'input__type--right-btn',
        ]"
        :type="inputType"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />

      <button
        v-if="isLeftButton && type !== 'textarea'"
        class="left-button input__btn"
        @click="onLeftClick"
      >
        <slot name="left-icon" />
      </button>
      <button
        v-if="isRightButton && type !== 'textarea'"
        class="right-button input__btn"
        @click="onRightClick"
      >
        <slot name="right-icon" />
      </button>
    </div>
    <small v-if="error" class="input__error">
      {{ validationText }}
    </small>
  </label>
</template>
