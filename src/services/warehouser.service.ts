import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { ErrorMessage } from 'src/common/enum/error.message.enum';
import { WarehouseRepository } from 'src/repositories/warehouse.repositories';

@Injectable({ scope: Scope.DEFAULT })
export class WarehouseService {
  constructor(private readonly userRepo: WarehouseRepository) { }

  async getAll() {
    let warehouse = await this.userRepo.findAll();
    if (!warehouse) {
      throw new BadRequestException(ErrorMessage.WAREHOUSE_NOT_FOUND);
    }
    return warehouse;
  }
}
