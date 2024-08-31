import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { TagService } from 'src/services/tag.service';
import { TagRes } from './types/tag_types/tag.res';
import { CreateTagReq } from './types/tag_types/create.tag.req';
import { GetAllTagRes } from './types/tag_types/get.all.tag.res';
import { GetAllTagReq } from './types/tag_types/get.all.tag.req';

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

  @Get('/all')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetAllTagRes,
  })
  async getAllUsers(@Query() queryParams: GetAllTagReq) {
    return await this.tagService.getAllTag(queryParams);
  }
}
