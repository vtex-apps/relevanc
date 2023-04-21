import { addTrackingTag, errorHandler } from '../utils/resolvers'

export async function after(
  _: unknown,
  { args }: AfterArgs,
  ctx: Context
): Promise<ProductSearchResult> {
  const { products } = args.searchResult

  let offersMap = await ctx.clients.offersMap.getOffersMap()

  if (!offersMap) {
    return errorHandler('Offers map not found', ctx)
  }

  for (const product of products) {
    addTrackingTag(offersMap, product)
  }

  // Clear offersMap from memory and VBase after each search
  offersMap = null
  await ctx.clients.offersMap.clearOffersMap()

  return args.searchResult
}
