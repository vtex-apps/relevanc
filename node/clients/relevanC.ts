import {
  InstanceOptions,
  IOContext,
  ExternalClient,
  PRODUCTION,
} from '@vtex/api'

export default class RelevanC extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://ads/peps.relevanc.io', context, options)
  }

  private getBaseUrl(serverName: string) {
    return PRODUCTION
      ? `http://${serverName}.ads.peps.relevanc.io`
      : `http://${serverName}.staging-ads.peps.relevanc.io`
  }

  public async getSponsoredOffers(
    serverName: string,
    params: SponsoredProductsPayload
  ): Promise<SponsoredProductsResponse> {
    const URL = this.getBaseUrl(serverName)

    return this.http.get(`${URL}/sponsored-offers`, {
      headers: {
        'x-vtex-use-https': 'true',
      },
      params,
      metric: 'relevanc-get-offers',
    })
  }
}
