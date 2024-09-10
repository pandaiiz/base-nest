import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator'

import { PagerDto } from '~/common/dto/pager.dto'

export class KnifeToolDto {
  @ApiProperty({ description: '刀具名称' })
  @IsString()
  @MinLength(1)
  name: string

  @ApiProperty({ description: '状态' })
  @IsOptional()
  @IsInt()
  status?: number

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string
}

export class KnifeToolQueryDto extends PagerDto {
  @ApiProperty({ description: '刀具名称' })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({ description: '刀具编码' })
  @IsString()
  @IsOptional()
  code: string

  @ApiProperty({ description: '供应商ID' })
  @IsOptional()
  @IsInt()
  supplierId?: number

  @ApiProperty({ description: '部门ID' })
  @IsOptional()
  @IsInt()
  deptId?: number

  @ApiProperty({ description: '表格类型' })
  @IsOptional()
  tableType?: string

  @ApiProperty({ description: '创建时间' })
  @IsOptional()
  startTime?: Date

  @ApiProperty({ description: '创建时间' })
  @IsOptional()
  endTime?: Date
}