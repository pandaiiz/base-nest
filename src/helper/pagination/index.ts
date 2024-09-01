export class Pagination<T> {
  data: T[]
  pagination: {
    current: number
    pageSize: number
  }
  success?: boolean
  total?: number
  summary?: any

  constructor(data: T[], total: number, current: number, pageSize: number, summary?: any) {
    this.data = data
    this.pagination = {
      current,
      pageSize
    }
    this.total = total
    this.success = true
    this.summary = summary
  }
}
