import { createCategoriesMap } from '../utils'

export const updateCategoriesMapService = async (ctx: Context) => {
  const {
    clients: { catalog, categories },
    vtex: { logger },
  } = ctx

  try {
    const categoryTree = await catalog.getCategoryTree()
    const categoriesMap = createCategoriesMap(categoryTree)

    const categoriesMapRecord: CategoriesMapRecord = {
      lastUpdated: Date(),
      categories: categoriesMap,
    }

    categories.updateCategoriesMap(categoriesMapRecord)
  } catch (error) {
    logger.error({
      reason: error.message ?? 'Something went wrong',
      data: error.response?.data,
    })
  }
}
