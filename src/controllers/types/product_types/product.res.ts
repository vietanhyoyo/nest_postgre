import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusUser } from 'src/common/enum/user.enum';
import Role from 'src/common/enum/role.enum';

export class ProductRes {
  @ApiProperty()
  @IsNumber()
  product_id: number;

  @ApiProperty()
  @IsString()
  product_name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
