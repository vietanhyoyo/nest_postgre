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
import { Public } from 'src/common/decorators/public.decorator';
import { IdolService } from 'src/services/idol.service';
import { GetAllIdolRes } from './types/idol_types/get.all.idol.res';
import { GetAllIdolReq } from './types/idol_types/get.all.idol.req';
import { IdolRes } from './types/idol_types/idol.res';
import { CreateIdolReq } from './types/idol_types/create.idol.req';
import { UpdateIdolReq } from './types/idol_types/update.idol.req';
import { CrawlIdolReq } from './types/idol_types/crawl.idol.req';
import axios from 'axios';
import { load } from 'cheerio';
import { Helper } from 'src/common/helper';

@Public()
@ApiTags('idol')
@ApiBearerAuth()
@Controller('idol')
export class IdolController {
  constructor(private idolService: IdolService) {}

  @Post('/')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: IdolRes,
  })
  async create(@Body() body: CreateIdolReq) {
    return this.idolService.createIdol(body);
  }

  @Get('/all')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetAllIdolRes,
  })
  async getAllIdol(@Query() queryParams: GetAllIdolReq) {
    return await this.idolService.getAllIdol(queryParams);
  }

  @Get('/:slug')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: IdolRes,
  })
  async getIdolBySlug(@Param('slug') slug: string) {
    return await this.idolService.getIdolBySlug(slug);
  }

  @Patch('/update')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: IdolRes,
  })
  async update(@Body() body: UpdateIdolReq) {
    return this.idolService.updateIdol(body);
  }

  @Delete('/:id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Idol deleted successfully',
  })
  async deleteIdol(@Param('id') idolId: number): Promise<void> {
    return await this.idolService.removeIdol(idolId);
  }

  @Post('/crawl')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Crawl successfully',
    type: IdolRes,
  })
  async crawlIdol(@Body() body: CrawlIdolReq) {
    const { data: html } = await axios.get(body.url);
    const $ = load(html);
    const idolData = {};

    //Take idol name -------------------------------------------
    const title = $('.mw-page-title-main').text();
    idolData['idol_name'] = title;

    //Take thumbnail -------------------------------------------
    const imgSrc = $('img.pi-image-thumbnail').attr('src');
    idolData['thumbnail'] = imgSrc;

    // Take bio links -------------------------------------------
    const links = [];
    $('td[data-source="sns"] a').each((index, element) => {
      const link = $(element).attr('href');
      if (link) {
        links.push(link);
      }
    });
    idolData['bio_link'] = links;

    // Take descriptions ----------------------------------------
    let backgroundInfo = '';
    $('section.pi-item.pi-group .pi-item.pi-data').each((index, element) => {
      const label = $(element).find('.pi-data-label').text().trim();
      const value = $(element).find('.pi-data-value').text().trim();

      if (label && value) {
        backgroundInfo += `${label}: ${value}. `;
      }
    });
    idolData['description'] = Helper.removeReferences(backgroundInfo);

    // Take detail ----------------------------------------------
    let careerContent = '';
    const careerSection = $('#Career').parent();
    careerSection.nextUntil('h2').each(function () {
      $(this).find('.mw-editsection').remove();
      careerContent += $.html(this);
    });
    idolData['detail'] = Helper.removeReferences(careerContent);

    // Take image ----------------------------------------------
    idolData['images'] = [];

    return this.idolService.createCrawlIdol(idolData);
  }
}
