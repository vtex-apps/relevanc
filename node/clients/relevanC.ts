import { ACCOUNT, InstanceOptions, IOContext, ExternalClient } from '@vtex/api'

const BASE_URL = {
  STAGING: `http://${ACCOUNT}.staging-ads.peps.relevanc.io`,
  PRODUCTION: `http://${ACCOUNT}.ads.peps.relevanc.io`,
}

export default class RelevanC extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(BASE_URL.PRODUCTION, context, options)
  }

  public async getSponsoredOffers(
    production: boolean,
    params: SponsoredProductsPayload
  ): Promise<SponsoredProductsResponse> {
    const URL = production ? BASE_URL.PRODUCTION : BASE_URL.STAGING

    return this.http.get(`${URL}/sponsored-offers`, {
      headers: {
        'x-vtex-use-https': 'true',
      },
      params: {
        ...params,
      },
      metric: 'status-get-raw',
    })
  }
}
