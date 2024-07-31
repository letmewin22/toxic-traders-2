import { clamp } from '~/utils/ea'
import validator from '~/utils/Validation'

export interface iInputData {
  id: string
  value: string
  error: boolean
}

export const useInput = (emit, props) => {
  const inputValue = ref(props.value ?? '')
  const inputBlur = ref(false)
  const error = ref(false)
  const $input = ref(null)
  const isPasswordVisible = ref(false)

  const inputType = computed(() => {
    if (props.type === 'password') {
      return isPasswordVisible.value ? 'text' : 'password'
    }

    return props.type
  })

  watch(
    () => props.value,
    () => {
      inputValue.value = props.value
      updateFields()
    }
  )

  const onFocus = () => {
    inputBlur.value = true
    emit('inputFocus', {
      id: props.id,
      value: inputValue.value.toString(),
      error: error.value,
    })
  }

  const onBlur = () => {
    if (props.type === 'number') {
      inputBlur.value = false
      emit('inputBlur', {
        id: props.id,
        value: inputValue.value.toString(),
        error: error.value,
      })
    }

    if (props.type !== 'number') {
      inputBlur.value = false
      emit('inputBlur', {
        id: props.id,
        value: inputValue.value,
        error: error.value,
      })
    }
  }

  const updateFields = () => {
    if (props.type === 'number') {
      if (inputValue.value) {
        // onFocus()
        // $input.value.focus()
        emit('inputValue', {
          id: props.id,
          value: inputValue.value.toString(),
          error: error.value,
        })
      }
    }

    if (props.type !== 'number') {
      if (inputValue.value.trim() !== '') {
        // onFocus()
        // $input.value.focus()
        emit('inputValue', {
          id: props.id,
          value: inputValue.value,
          error: error.value,
        })
      }
    }
  }

  const onPasswordVisibilityChange = () => {
    isPasswordVisible.value = !isPasswordVisible.value
  }

  const validationResult = () => {
    if (!props.validation) {
      return [false]
    }
    const options = props.validation.split(' ')

    const validators = options.map(option => {
      const method = option.replace(/[\d(].{0,}/gm, '')
      const param = option.replace(/.{0,}\(|\)/gm, '')
      return { method, param }
    })

    return validators.map(
      v => !validator[v.method](inputValue.value, v.param && v.param)
    )
  }

  const onInput = () => {
    error.value = validationResult().includes(true)

    if (
      props.type === 'number' &&
      typeof props.min === 'number' &&
      typeof props.max === 'number'
    ) {
      inputValue.value = clamp(+inputValue.value, props.min, props.max)
    }

    emit('inputValue', {
      id: props.id,
      value: inputValue.value,
      error: error.value,
    })
  }

  const throwError = () => {
    if (validationResult().includes(true)) {
      inputBlur.value = true
      error.value = true
      $input.value.focus()
    }
  }

  const reset = () => {
    inputValue.value = ''
    error.value = false
    onBlur()
    updateFields()
  }

  const resetSearch = () => {
    reset()
    emit('inputValue', {
      id: props.id,
      value: '',
      error: error.value,
    })
  }

  onMounted(() => {
    updateFields()
  })

  return {
    inputValue,
    inputBlur,
    error,
    $input,
    onFocus,
    onBlur,
    onInput,
    reset,
    resetSearch,
    throwError,
    onPasswordVisibilityChange,
    isPasswordVisible,
    inputType,
  }
}
