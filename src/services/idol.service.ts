import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { TagRepository } from 'src/repositories/tag.repositories';
import { CreateTagInput } from './types/tag_types/create.tag.input';
import { ErrorMessage } from 'src/common/enum/error.message.enum';
import { PaginationInput } from './types/pagination_types/pagination.input';
import { Idol } from 'src/entities/idol';
import { IdolRepository } from 'src/repositories/idol.repositories';

@Injectable({ scope: Scope.DEFAULT })
export class IdolService {
  constructor(private readonly idolRepo: IdolRepository) {}

  //   async createIdol(input: CreateIdolInput) {
  //     let idol = new Idol();

  //     let idolDb = await this.idolRepo.findByName(input.tag_name);
  //     if (idolDb) {
  //       throw new BadRequestException(ErrorMessage.TAG_EXITS);
  //     }

  //     tag.tag_name = input.tag_name;

  //     return await this.tagRepo.create(tag);
  //   }

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
}
