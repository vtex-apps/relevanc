import { DESKTOP } from '../../contants'

export const getSearchPageOffers = async (args: HandlerArgs) => {
  const {
    ctx: { clients },
    settings: { adServerName, maxOffersToDisplay },
    searchParams: { page, query },
  } = args

  try {
    const { offers } = await clients.relevanc.getSponsoredOffers(adServerName, {
      sourcePageNumber: page ? Number(page) : 0,
      keyOrigin: query as string,
      adSpaceId: DESKTOP,
    })

    offers.splice(maxOffersToDisplay)

    return offers
  } catch (error) {
    return null
  }
}
