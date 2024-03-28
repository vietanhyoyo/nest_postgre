import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Headers,
  UnauthorizedException,
  Param,
} from '@nestjs/common';
import { UserRes } from 'src/controllers/types/user_types/user.res';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WarehouseService } from 'src/services/warehouser.service';
import { WarehouseRes } from './types/warehouse_types/warehouse.res';
import { Public } from 'src/common/decorators/public.decorator';
import { ProductService } from 'src/services/product.service';
import { ProductRes } from './types/product_types/product.res';

@ApiTags('product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get('/:warehouse_id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: [ProductRes],
  })
  @ApiParam({ name: 'warehouse_id', type: Number })
  async get(@Param('warehouse_id') warehouseId: number) {
    return await this.productService.getByWarehouseID(warehouseId);
  }
}
