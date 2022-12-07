import { updateCategoriesMapService } from '../services'

export async function updateCategoriesMap(ctx: Context) {
  try {
    const categoriesMap = await updateCategoriesMapService(ctx)

    ctx.body = categoriesMap
  } catch (error) {
    throw new Error('Something went wrong updating the categories map')
  }
}
