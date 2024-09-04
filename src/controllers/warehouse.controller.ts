import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRes } from 'src/controllers/types/user_types/user.res';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WarehouseService } from 'src/services/warehouser.service';
import { WarehouseRes } from './types/warehouse_types/warehouse.res';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('warehouse')
@ApiBearerAuth()
@Controller('warehouse')
export class WarehouseController {
  constructor(private warehouseService: WarehouseService) {}

  @Public()
  @Get('/')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: [WarehouseRes],
  })
  async get() {
    return await this.warehouseService.getAll();
  }
}
