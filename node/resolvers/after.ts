import { addTrackingTag, errorHandler } from '../utils/resolvers'

export async function after(
  _: unknown,
  { args }: AfterArgs,
  ctx: Context
): Promise<ProductSearchResult> {
  const { products } = args.searchResult

  let offersMap = null

  try {
    const { customPluginInfo } = args

    if (customPluginInfo) {
      offersMap = JSON.parse(customPluginInfo)
    }
  } catch {
    return errorHandler('Problem parsing the customPluginInfo', ctx)
  }

  // eslint-disable-next-line no-console
  console.log('OffersMap', offersMap)

  if (!offersMap) {
    return errorHandler('Offers map not found', ctx)
  }

  for (const product of products) {
    addTrackingTag(offersMap, product)
  }

  return args.searchResult
}
