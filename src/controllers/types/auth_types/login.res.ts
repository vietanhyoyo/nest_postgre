import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRes {
  @ApiProperty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsString()
  user_id: number;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsString()
  user_name: string;
}
