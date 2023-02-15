import { JanusClient } from '@vtex/api'

export default class Catalog extends JanusClient {
  public getCategoryTree = async (
    /**
     * We use a high number to be sure to get all levels in category tree
     * @see https://developers.vtex.com/docs/api-reference/catalog-api#get-/api/catalog_system/pub/category/tree/-categoryLevels-
     */

    categoryLevels = 99
  ): Promise<CategoryTree> => {
    return this.http.get(
      `/api/catalog_system/pub/category/tree/${categoryLevels}`,
      {
        metric: 'catalog-get-category-tree',
      }
    )
  }
}
