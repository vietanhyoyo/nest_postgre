import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Tag } from 'src/entities/tag';

export class CreateIdolReq {
  @ApiProperty()
  @IsString()
  idol_name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  detail: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  bio_link: string[];

  @ApiProperty({ type: [Tag] })
  @IsArray()
  tags: Tag[];
}
