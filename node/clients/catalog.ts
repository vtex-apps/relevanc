import { JanusClient } from '@vtex/api'

export default class Catalog extends JanusClient {
  public getCategoryTree = async (
    categoryLevels = 99
  ): Promise<CategoryTree> => {
    return this.http.get(
      `/api/catalog_system/pub/category/tree/${categoryLevels}`
    )
  }
}
