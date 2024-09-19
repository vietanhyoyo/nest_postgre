import { ApiProperty } from '@nestjs/swagger';
import { TagRes } from '../tag_types/tag.res';

export class NewsRes {
  @ApiProperty()
  news_id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  views: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [TagRes] })
  tags: TagRes[];
}
