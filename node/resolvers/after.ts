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
  } catch {
    return errorHandler('Problem parsing the customPluginInfo', ctx)
  }

  if (!offersMap || !Object.keys(offersMap.offers).length) {
    return errorHandler('Offers map not found', ctx)
  }

  for (const product of products) {
    addTrackingTag(offersMap, product)
  }

  return args.searchResult
}
