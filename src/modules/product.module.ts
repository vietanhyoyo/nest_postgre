import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from 'src/controllers/product.controller';
import { WarehouseController } from 'src/controllers/warehouse.controller';
import { Product } from 'src/entities/product';
import { Warehouse } from 'src/entities/warehouse';
import { ProductRepository } from 'src/repositories/product.repositories';
import { WarehouseRepository } from 'src/repositories/warehouse.repositories';
import { ProductService } from 'src/services/product.service';
import { WarehouseService } from 'src/services/warehouser.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
