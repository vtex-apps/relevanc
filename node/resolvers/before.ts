import { CATEGORY_PAGE, SEARCH_PAGE } from '../contants'
import {
  errorHandler,
  getSettings,
  validateArgs,
  getSearchPageOffers,
  getCategoryPageOffers,
} from '../utils/handlers'
import { dynamicRulesMapper } from '../utils'

// We use this object to store some information needed on the after resolver
// eslint-disable-next-line import/no-mutable-exports
export const offersMap = {} as SponsoredOffersMap

export async function before(
  _: unknown,
  args: SearchParams,
  ctx: Context
): Promise<SearchParams> {
  if (!validateArgs(args)) {
    return errorHandler('Invalid search params', ctx)
  }

  const settings = await getSettings(ctx)

  if (!settings) {
    return errorHandler('Settings not found', ctx)
  }

  /**
   * The `query` param is only present for the Search Results page.
   * The selected facets can be present in both pages (Search Results and Categories)
   */
  const type = !args.query ? CATEGORY_PAGE : SEARCH_PAGE
  let offers: SponsoredOffer[] | null

  switch (type) {
    case SEARCH_PAGE: {
      offers = await getSearchPageOffers({
        ctx,
        settings,
        searchParams: args,
      })

      break
    }

    case CATEGORY_PAGE: {
      offers = await getCategoryPageOffers({
        ctx,
        settings,
        searchParams: args,
      })

      break
    }

    default: {
      return args
    }
  }

  if (!offers) {
    return errorHandler('AdServer request failed', ctx)
  }

  const dynamicRules = offers.map(offer => {
    offersMap[offer.offerId] = offer

    return dynamicRulesMapper(offer, settings)
  })

  return { ...args, dynamicRules }
}
