import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRes {
  @ApiProperty()
  @IsString()
  token: string;
}
