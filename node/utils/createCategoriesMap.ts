import { CATEGORY_BASE_URL } from '../contants'

export const createCategoriesMap = (
  categoryTree: CategoryTree,
  path: string | null = null,
  result: CategoriesMap = {}
): CategoriesMap => {
  for (const category of categoryTree) {
    const categoryPath = category.url.replace(CATEGORY_BASE_URL, '')
    const index = categoryPath.lastIndexOf('/')
    const categoryName =
      index > 0 ? categoryPath.slice(index + 1) : categoryPath

    const item = {
      id: String(category.id),
      name: categoryName,
      path: path ? `${path}/${category.id}` : `${category.id}`,
    }

    result[categoryName] = item

    if (category.hasChildren) {
      createCategoriesMap(category.children, item.path, result)
    }
  }

  return result
}
