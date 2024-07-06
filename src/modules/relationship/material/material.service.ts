import { Injectable } from '@nestjs/common'
import { Material } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { CrudService } from '~/helper/crud/crud.service'

@Injectable()
export class MaterialService extends CrudService<Material> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.material)
  }
}
