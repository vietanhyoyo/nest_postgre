import { Role } from '@/entities/role';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { StatusUser } from 'src/common/enum/user.enum';

export class CreateUserReq {
  @ApiProperty()
  @IsString()
  user_name: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum([StatusUser.ENABLE, StatusUser.DISABLE])
  status: StatusUser;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}
