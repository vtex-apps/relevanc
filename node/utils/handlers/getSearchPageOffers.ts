import { DESKTOP } from '../../contants'

export const getSearchPageOffers = async (args: HandlerArgs) => {
  const {
    ctx: { clients },
    settings: { adServerName, maxOffersToDisplay },
    searchParams: { page, query },
  } = args

  try {
    const { offers } = await clients.relevanC.getSponsoredOffers(adServerName, {
      sourcePageNumber: page ? Number(page) : 0,
      keyOrigin: query as string,
      adSpaceId: DESKTOP,
    })

    return offers.splice(maxOffersToDisplay)
  } catch (error) {
    return null
  }
}
