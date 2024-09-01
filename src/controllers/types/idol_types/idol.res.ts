import { ApiProperty } from '@nestjs/swagger';
import { TagRes } from '../tag_types/tag.res';

export class IdolRes {
  @ApiProperty()
  idol_id: number;

  @ApiProperty()
  idol_name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  detail: string;

  @ApiProperty()
  images: string[];

  @ApiProperty({ type: [TagRes] })
  tags: TagRes[];

  @ApiProperty()
  bio_link: string[];
}
