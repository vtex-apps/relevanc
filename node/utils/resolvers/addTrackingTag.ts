export function addTrackingTag(
  offersMap: Relevanc.SponsoredOffersMap,
  product: Product
) {
  const { boostType } = offersMap

  switch (boostType) {
    case 'productId': {
      const { productId } = product

      if (offersMap[productId]) {
        product.rule = {
          id: `dynamic:${productId}-${offersMap[productId].tag}`,
        }
      }

      return product
    }

    case 'skuId': {
      const [skuId] = product.items
        .map((item) => item.itemId)
        .filter((sku) => offersMap[sku])

      if (skuId) {
        product.rule = {
          id: `dynamic:${skuId}-${offersMap[skuId].tag}`,
        }
      }

      return product
    }

    default: {
      return product
    }
  }
}