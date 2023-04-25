import { addTrackingTag } from '../utils/resolvers'
import { offersMap } from './before'

export async function after(
  _: unknown,
  { args }: AfterArgs,
  __: Context
): Promise<ProductSearchResult> {
  const { products } = args.searchResult

  if (Object.keys(offersMap).length) {
    for (const product of products) {
      addTrackingTag(offersMap, product)
    }
  }

  return args.searchResult
}
