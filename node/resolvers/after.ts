import { offersMap } from './before'

export async function after(
  _: unknown,
  { args }: AfterArgs,
  __: Context
): Promise<ProductSearchResult> {
  for (const product of args.searchResult.products) {
    if (product.rule && product.rule.id.includes('dynamic')) {
      const [skuId] = product.items
        .map(item => item.itemId)
        .filter(sku => offersMap[sku])

      if (!skuId) {
        continue
      }

      product.rule = {
        id: `${skuId}-${offersMap[skuId].tag}`,
      }
    }
  }

  return args.searchResult
}
