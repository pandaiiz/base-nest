export function generateQueryFilter(filterConfig: any, query: any) {
  const where = {}
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
  return { current: query.current, pageSize: query.pageSize, where }
}
