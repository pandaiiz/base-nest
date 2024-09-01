export function generateQueryFilter(filterConfig: any, query: any) {
  const where = {}
  const orderBy = {}
  filterConfig.contains?.forEach((key: string | number) => {
    if (query[key]) {
      where[key] = {
        contains: query[key]
      }
    }
  })
  filterConfig.equals?.forEach((key: string | number) => {
    if (query[key] || query[key] === 0) {
      where[key] = query[key]
    }
  })
  if (filterConfig.orderBy) {
    orderBy[filterConfig.orderBy] = filterConfig.orderType
  }
  return { current: query.current, pageSize: query.pageSize, where, orderBy }
}
