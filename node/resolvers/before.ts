import { ACTION, DESKTOP } from '../contants'

export async function before(
  _: unknown,
  args: SearchParams,
  ctx: Context
): Promise<SearchParams> {
  const {
    clients: { relevanC, apps },
    vtex: { logger },
  } = ctx

  const searchQuery = args.query

  if (!searchQuery) {
    const message = 'Query was undefined'

    logger.error({
      message,
    })

    throw new Error(message)
  }

  const settings: AppSettings = await apps.getAppSettings(
    process.env.VTEX_APP_ID as string
  )

  if (!Object.keys(settings).length) {
    const message = 'Settings for RelevanC Integration not found'

    logger.error({
      message,
    })

    throw new Error(message)
  }

  const {
    adServerName,
    boostType,
    maxOffersToDisplay,
    addAllProducts,
    production,
  } = settings

  const { offers } = await relevanC.getSponsoredOffers(
    production,
    adServerName,
    {
      sourcePageNumber: 0,
      keyOrigin: searchQuery,
      adSpaceId: DESKTOP,
    }
  )

  if (!offers.length) {
    return args
  }

  const dynamicRules = offers.reduce((rules: DynamicRule[], offer, index) => {
    if (index < maxOffersToDisplay) {
      rules.push({
        action: addAllProducts ? ACTION.ADD : ACTION.PROMOTE,
        type: boostType,
        value: offer.productId,
      })
    }

    return rules
  }, [])

  return { ...args, dynamicRules }
}
