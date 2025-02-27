import { ApiProperty } from '@nestjs/swagger';
import { TagRes } from '../tag_types/tag.res';

export class IdolRes {
  @ApiProperty()
  idol_id: number;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  idol_name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  detail: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  is_banner: boolean;

  @ApiProperty()
  views: number;

  @ApiProperty({ type: [TagRes] })
  tags: TagRes[];

  @ApiProperty()
  bio_link: string[];
}
