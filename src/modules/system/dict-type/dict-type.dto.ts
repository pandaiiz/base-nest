import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator'

import { PagerDto } from '~/common/dto/pager.dto'

export class DictTypeDto {
  @ApiProperty({ description: '字典类型名称' })
  @IsString()
  @MinLength(1)
  name: string

  @ApiProperty({ description: '字典类型code' })
  @IsString()
  @MinLength(3)
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

export class DictTypeQueryDto extends PagerDto {
  @ApiProperty({ description: '字典类型名称' })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({ description: '字典类型code' })
  @IsString()
  @IsOptional()
  code: string
}
