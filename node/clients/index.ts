import type { ClientsConfig } from '@vtex/api'
import { IOClients } from '@vtex/api'

import CatalogClient from './catalog'
import CategoriesMapClient from './categoriesMap'
import RelevancClient from './relevanC'
import OffersMapClient from './offersMap'

const MEDIUM_TIMEOUT_MS = 2 * 1000

export class Clients extends IOClients {
  public get relevanc() {
    return this.getOrSet('relevanc', RelevancClient)
  }

  public get catalog() {
    return this.getOrSet('catalog', CatalogClient)
  }

  public get categoriesMap() {
    return this.getOrSet('categoriesMap', CategoriesMapClient)
  }

  public get offersMap() {
    return this.getOrSet('offersMap', OffersMapClient)
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
