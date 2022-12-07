import { CATEGORIES_MAP } from '../contants'
import { createCategoriesMap } from '../utils'

export const updateCategoriesMapService = async (ctx: Context) => {
  const { clients } = ctx

  try {
    const categoryTree = await clients.catalog.getCategoryTree()
    const categories = createCategoriesMap(categoryTree)

    const categoriesMap: CategoriesMapRecord = {
      lastUpdated: Date.now(),
      categories,
    }

    await clients.categories.save(CATEGORIES_MAP, categoriesMap)

    return categoriesMap
  } catch {
    return null
  }
}
