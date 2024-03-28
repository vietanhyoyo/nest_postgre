import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController } from 'src/controllers/warehouse.controller';
import { Warehouse } from 'src/entities/warehouse';
import { WarehouseRepository } from 'src/repositories/warehouse.repositories';
import { WarehouseService } from 'src/services/warehouser.service';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse])],
  controllers: [WarehouseController],
  providers: [WarehouseService, WarehouseRepository],
})
export class WarehouseModule {}
