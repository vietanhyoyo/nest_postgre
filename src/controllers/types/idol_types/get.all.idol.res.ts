import { ApiProperty } from '@nestjs/swagger';
import { PaginationRes } from '../pagination_types/pagination.res';
import { IdolRes } from './idol.res';

export class GetAllIdolRes extends PaginationRes {
  @ApiProperty({ type: [IdolRes], description: 'List of idol' })
  idols: IdolRes[];
}
