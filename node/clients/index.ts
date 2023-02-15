// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ClientsConfig, IOClients } from '@vtex/api'

import Catalog from './catalog'
import CategoriesMap from './categoriesMap'
import Relevanc from './relevanc'

const MEDIUM_TIMEOUT_MS = 2 * 1000

export class Clients extends IOClients {
  public get relevanc() {
    return this.getOrSet('relevanc', Relevanc)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get categories() {
    return this.getOrSet('categories', CategoriesMap)
  }
}

export const clientsConfig: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: MEDIUM_TIMEOUT_MS,
    },
  },
}
