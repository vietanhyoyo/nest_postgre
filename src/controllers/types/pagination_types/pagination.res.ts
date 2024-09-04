import { ApiProperty } from '@nestjs/swagger';

export class PaginationRes {
  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: string;
}
