import { CATEGORIES_MAP } from '../contants'

export async function getCategoriesMap(ctx: Context) {
  const {
    clients: { categories },
  } = ctx

  try {
    const categoriesMap = await categories.get(CATEGORIES_MAP, true)

    if (!categoriesMap) {
      ctx.body = 'Categories map has not been generated'

      return
    }

    ctx.body = categoriesMap
  } catch (err) {
    throw new Error('Unable to fetch categories map')
  }
}
