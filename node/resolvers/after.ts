import { addTrackingTag, errorHandler } from '../utils/resolvers'

export async function after(
  _: unknown,
  { args }: AfterArgs,
  ctx: Context
): Promise<ProductSearchResult> {
  const { products } = args.searchResult

  let offersMap: Relevanc.SponsoredOffersMap | null = null

  try {
    const { customPluginInfo } = args

    if (customPluginInfo) {
      offersMap = JSON.parse(customPluginInfo)
    }

    if (!offersMap || !Object.keys(offersMap.offers).length) {
      throw new Error('Offers map not found')
    }
  } catch (error) {
    return errorHandler(error.message, ctx, error)
  }

  for (const product of products) {
    addTrackingTag(offersMap, product)
  }

  return args.searchResult
}
