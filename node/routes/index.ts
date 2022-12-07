import { method } from '@vtex/api'

import {
  errorHandler,
  getCategoriesMap,
  updateCategoriesMap,
} from '../middleware'

export const routes = {
  categoriesMap: method({
    GET: [errorHandler, getCategoriesMap],
    PUT: [errorHandler, updateCategoriesMap],
  }),
}
