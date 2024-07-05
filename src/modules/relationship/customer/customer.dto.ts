import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator'

import { PagerDto } from '~/common/dto/pager.dto'

export class CustomerDto {
  @ApiProperty({ description: '字典类型名称' })
  @IsString()
  @MinLength(1)
  name: string

  @ApiProperty({ description: '字典类型code' })
  @IsString()
  @MinLength(1)
  code: string

  @ApiProperty({ description: '状态' })
  @IsOptional()
  @IsInt()
  status?: number

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string
}

export class CustomerQueryDto extends PagerDto {
  @ApiProperty({ description: '客户名称' })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({ description: '客户code' })
  @IsString()
  @IsOptional()
  code: string
}
