import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { StatusUser } from 'src/common/enum/user.enum';

export class UpdateUserReq {
  @ApiProperty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsString()
  user_name: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEnum([StatusUser.ENABLE, StatusUser.DISABLE])
  status: StatusUser;

  @ApiProperty()
  @IsArray()
  roles: string[];
}
