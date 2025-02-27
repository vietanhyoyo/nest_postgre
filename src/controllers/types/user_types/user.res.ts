import { Role } from '@/entities/role';
import { ApiProperty } from '@nestjs/swagger';
import { StatusUser } from 'src/common/enum/user.enum';

export class UserRes {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  user_name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  status: StatusUser;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
