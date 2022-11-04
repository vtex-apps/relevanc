import { InstanceOptions, IOContext, ExternalClient } from '@vtex/api'

const BASE_URL = (name: string) => ({
  STAGING: `http://${name}.staging-ads.peps.relevanc.io`,
  PRODUCTION: `http://${name}.ads.peps.relevanc.io`,
})

export default class RelevanC extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://ads/peps.relevanc.io', context, options)
  }

  public async getSponsoredOffers(
    production: boolean,
    serverName: string,
    params: SponsoredProductsPayload
  ): Promise<SponsoredProductsResponse> {
    const URL = production
      ? BASE_URL(serverName).PRODUCTION
      : BASE_URL(serverName).STAGING

    return this.http.get(`${URL}/sponsored-offers`, {
      headers: {
        'x-vtex-use-https': 'true',
      },
      params: {
        ...params,
      },
      metric: 'relevanc-get-offers',
    })
  }
}
