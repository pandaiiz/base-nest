import { Injectable } from '@nestjs/common'
import { DictItem } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { CrudService } from '~/helper/crud/crud.service'
import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'

@Injectable()
export class DictItemService extends CrudService<DictItem> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.dictItem)
  }

  async isExistKey(dto: DictItem): Promise<void | never> {
    const { value, typeId } = dto
    const result = await this.prisma.dictItem.findFirst({ where: { value, type: { id: typeId } } })
    if (result) throw new BusinessException(ErrorEnum.DICT_NAME_EXISTS)
  }

  async getDictItemsByDictCode(dictCode: string): Promise<DictItem[]> {
    const dict = await this.prisma.dictType.findUnique({
      where: { code: dictCode },
      include: { items: true }
    })
    return dict?.items
  }
}
