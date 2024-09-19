import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Tag } from 'src/entities/tag';

export class UpdateNewsReq {
  @ApiProperty()
  @IsNumber()
  news_id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  thumbnail: string;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ type: [Tag] })
  @IsArray()
  tags: Tag[];
}
