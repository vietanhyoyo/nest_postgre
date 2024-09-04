import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationReq {
  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Limit number of users per page',
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit: number = 10;
}
