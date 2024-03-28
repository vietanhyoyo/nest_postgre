import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusUser } from 'src/common/enum/user.enum';
import Role from 'src/common/enum/role.enum';

export class UserRes {
  @ApiProperty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsString()
  user_name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(StatusUser)
  status: StatusUser;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}
