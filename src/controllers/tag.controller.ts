import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { TagService } from 'src/services/tag.service';
import { TagRes } from './types/taq_types/tag.res';
import { CreateTagReq } from './types/taq_types/create.tag.req';

@Public()
@ApiTags('tag')
@ApiBearerAuth()
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Post('/')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: TagRes,
  })
  async create(@Body() body: CreateTagReq) {
    return this.tagService.createTag(body);
  }
}
