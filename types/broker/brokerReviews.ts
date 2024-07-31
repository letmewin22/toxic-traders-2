export interface iBrokerReviewsItem {
  id: number
  url: string
  rating: number
  numberOfReviews: number
  serviceName: string
}

export interface iBrokerReviewsData {
  data: {
    forexpeacearmy: iBrokerReviewsItem
    forexratings: iBrokerReviewsItem
    trustpilot: iBrokerReviewsItem
    wikifx: iBrokerReviewsItem
  }
}
