import type { InstanceOptions, IOContext} from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class RelevanC extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'http://exito.staging-ads.peps.relevanc.io/sponsored-offers?sourcePageNumber=0&keyOrigin=',
      context,
      options
    )
  }

  public async getOffers(params: string): Promise<any> {
    return this.http.get(params.toString(), {
      headers: {
        'x-vtex-use-https': 'true',
      },
      metric: 'status-get-raw',
    })
  }
}
