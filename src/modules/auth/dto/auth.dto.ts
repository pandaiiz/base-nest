import { ApiProperty } from '@nestjs/swagger'

import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @ApiProperty({ description: '手机号/邮箱' })
  @IsString()
  @MinLength(4)
  username: string

  @ApiProperty({ description: '密码', example: '123456' })
  @IsString()
  @MinLength(6)
  password: string
}

export class RegisterDto {
  @ApiProperty({ description: '账号' })
  @IsString()
  username: string

  @ApiProperty({ description: '密码' })
  @IsString()
  @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/)
  @MinLength(6)
  @MaxLength(16)
  password: string

  @ApiProperty({ description: '语言', examples: ['EN', 'ZH'] })
  @IsString()
  lang: string
}
