import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  async findByWarehouseId(warehouse_id: number) {
    return this.repo.find({
      where: { warehouse: { warehouse_id: warehouse_id } },
      relations: ['product_group', 'warehouse'],
    });
  }
}
