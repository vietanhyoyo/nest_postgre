import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { ErrorMessage } from 'src/common/enum/error.message.enum';
import { ProductRepository } from 'src/repositories/product.repositories';

@Injectable({ scope: Scope.DEFAULT })
export class ProductService {
  constructor(private readonly warehouseRepo: ProductRepository) { }

  async getByWarehouseID(warehouse_id: number) {
    let products = await this.warehouseRepo.findByWarehouseId(warehouse_id);
    if (!products) {
      throw new BadRequestException(ErrorMessage.WAREHOUSE_NOT_FOUND);
    }
    return products;
  }
}
