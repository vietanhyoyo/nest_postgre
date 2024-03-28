import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from 'src/entities/warehouse';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class WarehouseRepository {
  constructor(
    @InjectRepository(Warehouse)
    private repo: Repository<Warehouse>,
  ) {}

  async findAll() {
    return this.repo.find();
  }
}
