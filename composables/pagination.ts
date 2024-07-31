import type { iInput } from '~/types'

export const usePagination = (
  initialCurrentPage = 1,
  initialItemsCount = 25
) => {
  const currentPage = ref(initialCurrentPage)
  const totalCountPages = ref(0)
  const itemsCount = ref(initialItemsCount)
  const searchValue = ref<string>('1')

  const computedTotalPages = computed(() => {
    return Math.floor(totalCountPages.value / itemsCount.value)
  })

  const prevPageClick = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const nextPageClick = () => {
    if (currentPage.value - 1 < computedTotalPages.value) {
      currentPage.value++
    }
  }

  const onInputChange = (input: iInput) => {
    const inputPage = input.value

    if (Number(inputPage) > computedTotalPages.value) {
      searchValue.value = computedTotalPages.value.toString()
    }
  }

  const onInputBlur = (input: iInput) => {
    currentPage.value = Number(input.value)
  }

  const onChangeCount = (val: string) => {
    itemsCount.value = parseInt(val)

    if (currentPage.value > computedTotalPages.value) {
      currentPage.value = computedTotalPages.value + 1
    }
  }

  return {
    currentPage,
    totalCountPages,
    itemsCount,
    computedTotalPages,
    searchValue,
    prevPageClick,
    nextPageClick,
    onInputChange,
    onInputBlur,
    onChangeCount,
  }
}
