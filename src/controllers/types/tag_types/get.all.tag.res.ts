import { ApiProperty } from '@nestjs/swagger';
import { PaginationRes } from '../pagination_types/pagination.res';
import { TagRes } from './tag.res';

export class GetAllTagRes extends PaginationRes {
  @ApiProperty({ type: [TagRes], description: 'List of tags' })
  tags: TagRes[];
}
