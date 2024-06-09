import { Injectable } from '@nestjs/common'
import { DictType } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { CrudService } from '~/helper/crud/crud.service'
import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'

@Injectable()
export class DictTypeService extends CrudService<DictType> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.dictType)
  }

  async isExistKey(name: string): Promise<void | never> {
    const result = await this.prisma.dictType.findUnique({ where: { name } })
    if (result) throw new BusinessException(ErrorEnum.DICT_NAME_EXISTS)
  }
}
