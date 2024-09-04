import { ApiProperty } from '@nestjs/swagger';
import { UserRes } from './user.res';
import { PaginationRes } from '../pagination_types/pagination.res';

export class GetAllUserRes extends PaginationRes {
  @ApiProperty({ type: [UserRes], description: 'List of users' })
  users: UserRes[];
}
