import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

import { PagerDto } from '~/common/dto/pager.dto'

export class IoOrderDto {
  @ApiProperty({ description: '员工名称' })
  @IsString()
  @MinLength(1)
  orderNumber: string

  @ApiProperty({ description: '单重' })
  @IsNumber()
  sigleWeight: number

  @ApiProperty({ description: '总重' })
  @IsNumber()
  totalWeight: number

  @ApiProperty({ description: '件数' })
  @IsInt()
  quantity: number

  @ApiProperty({ description: '状态' })
  @IsInt()
  status: number

  @ApiProperty({ description: '备注' })
  @IsOptional()
  remark?: string
}

export class IoOrderQueryDto extends PagerDto {
  @ApiProperty({ description: '员工名称' })
  @IsString()
  @IsOptional()
  orderNumber: string
}
