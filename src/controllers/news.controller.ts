import { Public } from '@/common/decorators/public.decorator';
import { NewsService } from '@/services/news.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllNewsReq } from './types/news_types/get.all.news.req';
import { GetAllNewsRes } from './types/news_types/get.all.news.res';
import { NewsRes } from './types/news_types/news.res';
import { CreateNewsReq } from './types/news_types/create.news.req';
import { UpdateNewsReq } from './types/news_types/update.news.req';

@Public()
@ApiTags('news')
@ApiBearerAuth()
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Post('/')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: NewsRes,
  })
  async create(@Body() body: CreateNewsReq) {
    return this.newsService.createNews(body);
  }

  @Get('/all')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetAllNewsRes,
  })
  async getAllIdol(@Query() queryParams: GetAllNewsReq) {
    return await this.newsService.getAllNews(queryParams);
  }

  @Patch('/update')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: NewsRes,
  })
  async update(@Body() body: UpdateNewsReq) {
    return this.newsService.updateNews(body);
  }

  @Delete('/:id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Idol deleted successfully',
  })
  async deleteIdol(@Param('id') newsId: number): Promise<void> {
    return await this.newsService.removeNews(newsId);
  }
}
