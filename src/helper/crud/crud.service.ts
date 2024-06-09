import { PrismaService } from 'nestjs-prisma'
import { Pagination } from '~/helper/pagination'
import { PagerDto } from '~/common/dto/pager.dto'

export class CrudService<T> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly model: any
  ) {}

  async create(data: T): Promise<T> {
    return this.model.create({ data })
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany()
  }

  async page(query: PagerDto): Promise<Pagination<T>> {
    const { current, pageSize, where } = query
    const skip = (+current - 1) * +pageSize
    const take = +pageSize
    const [data, total] = await this.prisma.$transaction([
      this.model.findMany({ skip, take, where }),
      this.model.count()
    ])
    return new Pagination<T>(data, total, current, pageSize)
  }

  async findOne(id: number): Promise<T> {
    return this.model.findUnique({ where: { id } })
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return this.model.update({ where: { id }, data })
  }

  async delete(id: number): Promise<T> {
    return this.model.delete({ where: { id } })
  }
}
