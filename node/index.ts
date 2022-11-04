import { Service, RecorderState, ParamsContext } from '@vtex/api'
import schema from 'vtex.is-api-middleware-graphql/graphql'

import { Clients, clients } from './clients'
import { resolvers } from './resolvers'

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  graphql: {
    resolvers,
    schema,
  },
})
