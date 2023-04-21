import type { InstanceOptions, IOContext } from '@vtex/api'
import { VBase } from '@vtex/api'

import { BUCKET, OFFERS_MAP } from '../contants'

export default class OffersMapClient extends VBase {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
    })
  }

  public getOffersMap = (): Promise<Relevanc.SponsoredOffersMap | null> =>
    this.getJSON(BUCKET, OFFERS_MAP, true)

  public updateOffersMap = (data: Relevanc.SponsoredOffersMap) =>
    this.saveJSON(BUCKET, OFFERS_MAP, data)
}
