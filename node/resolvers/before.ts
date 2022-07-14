export default async function before(
  _: unknown,
  args: SearchParams,
  __: Context
): Promise<SearchParams> {
  // This is just an example. Change the implementation of this function however you like :)

  const myDynamicRules: DynamicRule[] = [
    {
      action: 'promote',
      type: 'id',
      value: '13',
    },
    {
      action: 'promote',
      type: 'id',
      value: '2000024',
    },
  ]

  return { ...args, query: 'top', dynamicRules: myDynamicRules }
}
