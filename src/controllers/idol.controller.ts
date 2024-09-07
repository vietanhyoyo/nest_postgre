import {
  Body,
  Controller,
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

  @Patch('/update')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: IdolRes,
  })
  async update(@Body() body: UpdateIdolReq) {
    return this.idolService.updateIdol(body);
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
}
