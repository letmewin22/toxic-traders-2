export interface iDepositMethodItem {
  depositMethod: number
}

export interface iDepositMethodsData {
  data: {
    depositMethods: iDepositMethodItem[]
  }
}

export interface iDepositMethodsListData {
  data: {
    [key: number]: string
  }
}
