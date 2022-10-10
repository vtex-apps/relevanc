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
  const { production, maxOffersToDisplay } = await apps.getAppSettings(
    process.env.VTEX_APP_ID as string
  )

  try {
    const test = await relevanC.getSponsoredOffers(production, {
      sourcePageNumber: 0,
      keyOrigin: searchQuery,
      adSpaceId: 'PC_LR_PLR',
    })

    const { offers } = test

    if (!offers.length) {
      return args
    }

    const dynamicRules = offers.reduce((rules: DynamicRule[], offer, index) => {
      if (index < maxOffersToDisplay) {
        rules.push({
          action: 'promote',
          type: 'id',
          value: offer.productId,
        })
      }

      return rules
    }, [])

    return { ...args, dynamicRules }
  } catch (error) {
    logger.error({
      message: error.message ?? 'Something went wrong',
      data: error,
    })

    return args
  }
}
