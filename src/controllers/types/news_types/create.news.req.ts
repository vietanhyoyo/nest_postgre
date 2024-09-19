import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Tag } from 'src/entities/tag';

export class CreateNewsReq {
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
