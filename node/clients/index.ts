import { ClientsConfig, IOClients } from '@vtex/api'

import Catalog from './catalog'
import Categories from './categories'
import RelevanC from './relevanc'

const MEDIUM_TIMEOUT_MS = 2 * 1000

export class Clients extends IOClients {
  public get relevanC() {
    return this.getOrSet('relevanc', RelevanC)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get categories() {
    return this.getOrSet('categories', Categories)
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
