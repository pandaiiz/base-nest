import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Matches, MinLength } from 'class-validator'

export class AccountUpdateDto {
  @ApiProperty({ description: '用户呢称' })
  @IsString()
  @IsOptional()
  nickname: string

  @ApiProperty({ description: '用户备注' })
  @IsOptional()
  @IsString()
  remark: string
}

export class ResetPasswordDto {
  @ApiProperty({ description: '临时token', example: 'uuid' })
  @IsString()
  accessToken: string

  @ApiProperty({ description: '密码', example: 'a123456' })
  @IsString()
  @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/)
  @MinLength(6)
  password: string
}
