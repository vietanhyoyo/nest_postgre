import { Public } from '@/common/decorators/public.decorator';
import { NewsService } from '@/services/news.service';
import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllNewsReq } from './types/news_types/get.all.news.req';
import { GetAllNewsRes } from './types/news_types/get.all.news.res';

@Public()
@ApiTags('news')
@ApiBearerAuth()
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('/all')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetAllNewsRes,
  })
  async getAllIdol(@Query() queryParams: GetAllNewsReq) {
    return await this.newsService.getAllNews(queryParams);
  }
}
