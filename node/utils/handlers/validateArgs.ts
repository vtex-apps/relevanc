export const validateArgs = (args: SearchParams) => {
  const { query, selectedFacets } = args

  if (!query && !selectedFacets?.length) {
    return false
  }

  return true
}
