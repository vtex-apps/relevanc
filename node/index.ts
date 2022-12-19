import { ParamsContext, RecorderState, Service } from '@vtex/api'
import schema from 'vtex.is-api-middleware-graphql/graphql'

import { Clients, clientsConfig } from './clients'
import { resolvers } from './resolvers'
import { routes } from './routes'

export default new Service<Clients, RecorderState, ParamsContext>({
  clients: clientsConfig,
  routes,
  graphql: {
    resolvers,
    schema,
  },
})
