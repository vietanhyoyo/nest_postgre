import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { ErrorMessage } from 'src/common/enum/error.message.enum';
import { PaginationInput } from './types/pagination_types/pagination.input';
import { Idol } from 'src/entities/idol';
import { IdolRepository } from 'src/repositories/idol.repositories';
import { CreateIdolInput } from './types/idol_types/create.idol.input';
import { UpdateIdolInput } from './types/idol_types/update.idol.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag';
import { Repository } from 'typeorm';
import { TagRepository } from 'src/repositories/tag.repositories';

@Injectable({ scope: Scope.DEFAULT })
export class IdolService {
  constructor(
    private readonly idolRepo: IdolRepository,
    private readonly tagRepo: TagRepository,
  ) {}

  async createIdol(input: CreateIdolInput) {
    let idol = new Idol();

    let idolDb = await this.idolRepo.findByName(input.idol_name);
    if (idolDb) {
      throw new BadRequestException(ErrorMessage.DATA_EXITS);
    }

    idol.thumbnail = input.thumbnail;
    idol.idol_name = input.idol_name;
    idol.description = input.description;
    idol.detail = input.detail;
    idol.images = input.images;
    idol.bio_link = input.bio_link;
    idol.tags = input.tags;

    return await this.idolRepo.create(idol);
  }

  async getAllIdol(queryParams: PaginationInput) {
    const { page = 1, limit = 10 } = queryParams;

    const [idols, total] = await this.idolRepo.findAll({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      total,
      totalPages,
      currentPage: page,
      idols,
    };
  }

  async updateIdol(input: UpdateIdolInput) {
    // Check if idol exists by ID
    const idol = await this.idolRepo.findById(input.idol_id);

    if (!idol) {
      throw new NotFoundException(ErrorMessage.DATA_NOT_FOUND);
    }

    // Update the idol with the new data
    idol.thumbnail = input.thumbnail;
    idol.idol_name = input.idol_name;
    idol.description = input.description;
    idol.detail = input.detail;
    idol.images = input.images;
    idol.bio_link = input.bio_link;
    idol.tags = input.tags;

    // Save the updated idol
    const updatedIdol = await this.idolRepo.update(idol);

    return updatedIdol;
  }
}
