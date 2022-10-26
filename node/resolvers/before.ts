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

  const searchQuery = args.query as string
  const settings: AppSettings = await apps.getAppSettings(
    process.env.VTEX_APP_ID as string
  )

  if (!Object.keys(settings).length) {
    throw new Error('Settings not found')
  }

  const { adServerName, production, boostType, maxOffersToDisplay } = settings

  try {
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
      throw new Error('No offers returned from RelevanC')
    }

    const dynamicRules = offers.reduce((rules: DynamicRule[], offer, index) => {
      if (index < maxOffersToDisplay) {
        rules.push({
          action: ACTION.PROMOTE,
          type: boostType,
          value: offer.productId,
        })
      }

      return rules
    }, [])

    return { ...args, dynamicRules }
  } catch (error) {
    logger.error({
      message: error.message ?? 'Something went wrong',
    })

    return args
  }
}
