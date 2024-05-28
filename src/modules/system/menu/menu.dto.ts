import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsIn, IsInt, IsOptional, IsString, Min, MinLength, ValidateIf } from 'class-validator'

export class MenuDto {
  @ApiProperty({ description: '菜单类型' })
  @IsIn(['ACCESS', 'MENU', 'CATALOG'])
  type: string

  @ApiProperty({ description: '父级菜单' })
  @IsOptional()
  parentId: number

  @ApiProperty({ description: '菜单或权限名称' })
  @IsString()
  @MinLength(2)
  name: string

  @ApiProperty({ description: '排序' })
  @IsInt()
  @Min(0)
  sort: number

  @ApiProperty({ description: '前端路由地址' })
  // @Matches(/^[/]$/)
  @ValidateIf((o) => o.type !== 2)
  path: string

  @ApiProperty({ description: '菜单是否显示', default: 1 })
  @ValidateIf((o: MenuDto) => o.type !== 'ACCESS')
  @IsIn([0, 1])
  show: number

  @ApiProperty({ description: '状态', default: 1 })
  @IsIn([0, 1])
  status: number

  @ApiProperty({ description: '菜单图标' })
  @IsOptional()
  @ValidateIf((o: MenuDto) => o.type !== 'ACCESS')
  @IsString()
  icon?: string

  @ApiProperty({ description: '对应权限' })
  @ValidateIf((o: MenuDto) => o.type === 'ACCESS')
  @IsString()
  @IsOptional()
  permission: string

  @ApiProperty({ description: '菜单路由路径或外链' })
  @ValidateIf((o: MenuDto) => o.type !== 'ACCESS')
  @IsString()
  @IsOptional()
  component?: string
}

export class MenuUpdateDto extends PartialType(MenuDto) {}

export class MenuQueryDto extends PartialType(MenuDto) {}
