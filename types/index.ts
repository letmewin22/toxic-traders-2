export interface iSearchInput {
  title?: string
  required?: boolean
  id: string
  name: string
  type?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  isLeftButton?: boolean
  isRightButton?: boolean
  options?: string[]
}

export interface iLink {
  text: string
  url: string
}

export interface iInput {
  id: string
  value: string
  error: boolean
}

export interface iSelectInput {
  id: string
  value: string
}

export interface iAccountModalItem {
  required?: boolean
  id?: string
  name?: string
  type?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  isLeftButton?: boolean
  isRightButton?: boolean
  options?: string[] | Ref<string[]>
  isPassword?: boolean
}

export interface iData {
  data: {
    [key: number]: string
  }
}
