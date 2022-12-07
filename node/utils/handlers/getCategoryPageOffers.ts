import { CATEGORIES_MAP, DESKTOP } from '../../contants'
import { updateCategoriesMapService } from '../../services'

export const getCategoryPageOffers = async (args: HandlerArgs) => {
  const {
    ctx: { clients },
    settings: { adServerName, maxOffersToDisplay },
    searchParams: { page, selectedFacets },
  } = args

  if (!selectedFacets?.length || selectedFacets[0].key !== 'c') {
    return []
  }

  try {
    let categoriesMap = await clients.categories.get(CATEGORIES_MAP, true)

    if (!categoriesMap) {
      categoriesMap = await updateCategoriesMapService(args.ctx)
    }

    const categoryName = selectedFacets[selectedFacets?.length - 1].value
    const item = categoriesMap?.categories[categoryName]

    if (!item) {
      return null
    }

    const { offers } = await clients.relevanC.getSponsoredOffers(adServerName, {
      sourcePageNumber: page ? Number(page) : 0,
      keyId: item.id,
      filterCategoryCodePath: item.path,
      adSpaceId: DESKTOP,
    })

    return offers.splice(maxOffersToDisplay)
  } catch (error) {
    return null
  }
}
