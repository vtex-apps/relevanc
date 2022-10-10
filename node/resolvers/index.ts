import { before } from './before'

export const resolvers = {
  Query: {
    before,
  },
}
