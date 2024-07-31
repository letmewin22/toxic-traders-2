export interface ISortState {
  sortBy?: string
  sortOrder?: 1 | 2
}

type TFunc = (...args: any) => any

export const useSort = (defaultSortState?: ISortState, onSortCb?: TFunc) => {
  const sortState = ref<ISortState>({
    sortBy: defaultSortState?.sortBy || '',
    sortOrder: defaultSortState?.sortOrder || 1,
  })

  const onSort = (item: string) => {
    sortState.value = {
      sortBy: item,
      sortOrder: sortState.value.sortOrder === 1 ? 2 : 1,
    }

    if (typeof onSortCb !== 'function') return
    onSortCb()
  }

  return { sortState, onSort }
}
