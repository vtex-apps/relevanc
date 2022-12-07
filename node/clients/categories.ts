import { vbaseFor } from '@vtex/clients'

import { BUCKET } from '../contants'

const Categories = vbaseFor<string, CategoriesMapRecord>(BUCKET)

export default Categories
