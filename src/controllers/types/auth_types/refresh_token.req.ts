import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenReq {
  @ApiProperty()
  @IsString()
  refresh_token: string;
}
