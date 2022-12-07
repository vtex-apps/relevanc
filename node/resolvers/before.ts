import { CATEGORY_PAGE, SEARCH_PAGE } from '../contants'
import {
  errorHandler,
  getSettings,
  validateArgs,
  getSearchPageOffers,
  getCategoryPageOffers,
} from '../utils/handlers'
import { dynamicRulesMapper } from '../utils'

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
  let offers

  switch (type) {
    case SEARCH_PAGE: {
      offers = await getSearchPageOffers({
        ctx,
        settings,
        searchParams: args,
      })

      if (!offers) {
        return errorHandler('AdServer request failed', ctx)
      }

      break
    }

    case CATEGORY_PAGE: {
      offers = await getCategoryPageOffers({
        ctx,
        settings,
        searchParams: args,
      })

      if (!offers) {
        return errorHandler('AdServer request failed', ctx)
      }

      break
    }

    default: {
      return args
    }
  }

  const dynamicRules = offers.map(offer => dynamicRulesMapper(offer, settings))

  return { ...args, dynamicRules }
}
