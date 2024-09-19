import { ApiProperty } from '@nestjs/swagger';
import { PaginationRes } from '../pagination_types/pagination.res';
import { NewsRes } from './news.res';

export class GetAllNewsRes extends PaginationRes {
  @ApiProperty({ type: [NewsRes], description: 'List of news' })
  news: NewsRes[];
}
