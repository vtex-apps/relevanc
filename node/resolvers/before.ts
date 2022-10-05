export default async function before(
  _: unknown,
  args: SearchParams,
  ctx: Context
): Promise<SearchParams> {
  const {
    clients: { relevanC },
  } = ctx
  // This is just an example. Change the implementation of this function however you like :)
  console.log(args.query)
  const searchQuery = args.query
  const sponsoredProducts = await relevanC.getOffers(
    `${searchQuery}&adSpaceId=PC_LR_PLR`
  )
  console.log(sponsoredProducts)

  if (sponsoredProducts.offers.length) {
    console.log('hola cesarin')
    const myDynamicRules: DynamicRule[] = []
    for (const spProduct of sponsoredProducts.offers) {
      myDynamicRules.push({
        action: 'promote',
        type: 'id',
        value: spProduct.productId,
      })
    }
    console.log(myDynamicRules)

    return { ...args, dynamicRules: myDynamicRules }
  }
  const customRules: DynamicRule[] = [
    {
      action: 'add',
      type: 'id',
      value: '1253',
    },
    {
      action: 'promote',
      type: 'id',
      value: '1253',
    },
    {
      action: 'remove',
      type: 'id',
      value: '1336358',
    },

    // {
    //   action: 'promote',
    //   type: 'id',
    //   value: '857952',
    // },
    // {
    //   action: 'promote',
    //   type: 'id',
    //   value: '308625',
    // },
  ]
  console.log(customRules)

  return { ...args, dynamicRules: customRules }
}
