import { CustomError } from '../../utils'

export async function getCategoriesMap(ctx: Context) {
  const {
    clients: { categories },
  } = ctx

  try {
    const categoriesMap = await categories.getCategoriesMap()

    if (!categoriesMap) {
      ctx.body = 'Categories map has not been generated'

      return
    }

    ctx.body = categoriesMap
  } catch (err) {
    throw new CustomError({
      message: err.message,
      reason: 'Unable to fetch categories map',
      status: 500,
    })
  }
}
