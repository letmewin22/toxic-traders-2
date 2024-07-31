export interface iPlatformsItem {
  platform: number
}

export interface iPlatformsData {
  data: {
    platforms: iPlatformsItem[]
  }
}

export interface iPlatformsListData {
  data: {
    [key: number]: string
  }
}
