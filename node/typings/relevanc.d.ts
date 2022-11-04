type BaseSponsoredProductsPaylaod = {
  adSpaceId: 'PC_LR_PLR' | 'MOB_LR_PLR'
  sourcePageNumber: number
}

type KeyIdSponsoredProductsPayload = BaseSponsoredProductsPaylaod & {
  keyId: string
  filterCategoryCodePath: string
}

type KeyOriginSponsoredProductsPayload = BaseSponsoredProductsPaylaod & {
  keyOrigin: string
  filterCategoryCodePath?: string
}

type SponsoredProductsPayload =
  | KeyIdSponsoredProductsPayload
  | KeyOriginSponsoredProductsPayload

type Offer = {
  algoSelectionType:
    | 'NOTSELECTED'
    | 'EXPLORED'
    | 'UNEXPLORED'
    | 'LONGTAIL'
    | 'SHORTTAIL'
  isSponsored: boolean
  offerId: number
  productId: string
  tagName: string
  tag: string
}

type SponsoredProductsResponse = {
  nbResults: number
  offers: Offer[]
}
