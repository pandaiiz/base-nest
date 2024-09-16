import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator'

import { PagerDto } from '~/common/dto/pager.dto'

export class UserDto {
  @ApiProperty({ description: '登录账号', example: 'admin' })
  @IsString()
  @Matches(/^[a-z0-9A-Z\W_]+$/)
  @MinLength(4)
  @MaxLength(20)
  username: string

  @ApiProperty({ description: '登录密码', example: 'a123456' })
  @IsOptional()
  password: string

  @ApiProperty({ description: '归属角色', type: [Number] })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  roleIds: number[]

  @ApiProperty({ description: '归属部门', type: Number })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  deptId?: number

  @ApiProperty({ description: '呢称', example: 'admin' })
  @IsOptional()
  @IsString()
  nickname: string

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string

  @ApiProperty({ description: '状态' })
  @IsIn([0, 1])
  status: number
}

export class UserUpdateDto extends PartialType(UserDto) {}

export class UserQueryDto extends IntersectionType(PagerDto, PartialType(UserDto)) {
  @ApiProperty({ description: '归属大区', example: 1, required: false })
  @IsInt()
  @IsOptional()
  deptId?: number

  @ApiProperty({ description: '状态', example: 0, required: false })
  @IsInt()
  @IsOptional()
  status?: number
}
