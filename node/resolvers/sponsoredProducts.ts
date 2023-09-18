import { PAGE_TYPE } from "../contants";
import {
  errorHandler,
  getSettings,
  validateArgs,
  getSearchPageOffers,
  getCategoryPageOffers,
} from "../utils/resolvers";

export async function sponsoredProducts(
  _: unknown,
  args: SearchParams,
  ctx: Context
): Promise<SponsoredProduct[]> {
  if (!validateArgs(args)) {
    return errorHandler("Invalid search params", ctx);
  }

  const settings = await getSettings(ctx);

  if (!settings) {
    return errorHandler("Settings not found", ctx);
  }

  /**
   * The `query` param is only present for the Search Results page.
   * The selectedFacets can be present in both pages (Search Results and Categories)
   */
  const type = !args.query ? PAGE_TYPE.CATEGORY : PAGE_TYPE.SEARCH;
  let offers: Relevanc.SponsoredOffer[] | null;

  switch (type) {
    case PAGE_TYPE.SEARCH: {
      offers = await getSearchPageOffers({
        ctx,
        settings,
        searchParams: args,
      });

      break;
    }

    case PAGE_TYPE.CATEGORY: {
      offers = await getCategoryPageOffers({
        ctx,
        settings,
        searchParams: args,
      });

      break;
    }

    default: {
      return [];
    }
  }

  if (!offers) {
    return [];
  }

  return offers.map((offer) => ({
    productId: offer.productId,
    rule: { id: `dynamic:${offer.offerId}-${offer.tag}` },
  }));
}
