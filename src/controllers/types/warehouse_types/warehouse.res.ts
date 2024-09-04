import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusUser } from 'src/common/enum/user.enum';
import Role from 'src/common/enum/role.enum';

export class WarehouseRes {
  @ApiProperty()
  @IsNumber()
  warehouse_id: number;

  @ApiProperty()
  @IsString()
  warehouse_name: string;

  @ApiProperty()
  @IsString()
  address: string;
}
