import type { iSearchInput } from '..'

export interface iSpreadsInput {
  title: string
  placeholder: string
  options?: string[]
  required?: boolean
  id?: string
  name?: string
  type?: string
  value?: string
  isRightButton?: boolean
  searchInput?: iSearchInput
}
