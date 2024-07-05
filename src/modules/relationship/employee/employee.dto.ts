import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator'

import { PagerDto } from '~/common/dto/pager.dto'

export class EmployeeDto {
  @ApiProperty({ description: '员工名称' })
  @IsString()
  @MinLength(1)
  name: string

  @ApiProperty({ description: '员工code' })
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

export class EmployeeQueryDto extends PagerDto {
  @ApiProperty({ description: '员工名称' })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({ description: '员工code' })
  @IsString()
  @IsOptional()
  code: string
}
