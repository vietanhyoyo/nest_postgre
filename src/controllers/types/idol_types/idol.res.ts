import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/entities/tag';

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

  @ApiProperty()
  tags: Tag[];

  @ApiProperty()
  bio_link: string[];
}
