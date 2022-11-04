import { ClientsConfig, IOClients } from '@vtex/api'

import RelevanC from './relevanC'

const MEDIUM_TIMEOUT_MS = 2 * 1000

export class Clients extends IOClients {
  public get relevanC() {
    return this.getOrSet('relevanC', RelevanC)
  }
}

export const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: MEDIUM_TIMEOUT_MS,
    },
  },
}
