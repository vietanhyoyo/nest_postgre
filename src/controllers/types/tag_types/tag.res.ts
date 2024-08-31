import { ApiProperty } from '@nestjs/swagger';

export class TagRes {
  @ApiProperty()
  tag_id: number;

  @ApiProperty()
  tag_name: string;
}
