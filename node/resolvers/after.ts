import { addTrackingTag, errorHandler } from '../utils/resolvers'

export async function after(
  _: unknown,
  { args }: AfterArgs,
  ctx: Context
): Promise<ProductSearchResult> {
  const { products } = args.searchResult

  let offersMap = null

  try {
    const {customPluginInfo} = args
    
    if (customPluginInfo) {
      offersMap = JSON.parse(customPluginInfo)
    }
  } catch(e) {
    return errorHandler('Problem parsing the customPluginInfo', ctx)
  }

  if (!offersMap) {
    return errorHandler('Offers map not found', ctx)
  }

  for (const product of products) {
    addTrackingTag(offersMap, product)
  }

  return args.searchResult
}
