import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagReq {
  @ApiProperty()
  @IsString()
  tag_name: string;
}
