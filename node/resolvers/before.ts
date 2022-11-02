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

  try {
    const searchQuery = args.query

    if (!searchQuery) {
      throw new Error('Query was undefined')
    }

    const settings: AppSettings = await apps.getAppSettings(
      process.env.VTEX_APP_ID as string
    )

    if (!Object.keys(settings).length) {
      throw new Error('Settings not found')
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
      throw new Error('No offers returned from RelevanC')
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
  } catch (error) {
    logger.error({
      message: error.message ?? 'Something went wrong',
    })

    return error
  }
}
