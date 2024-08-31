import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { TagRepository } from 'src/repositories/tag.repositories';
import { CreateTagInput } from './types/tag_types/create.tag.input';
import { Tag } from 'src/entities/tag';
import { ErrorMessage } from 'src/common/enum/error.message.enum';
import { PaginationInput } from './types/pagination_types/pagination.input';

@Injectable({ scope: Scope.DEFAULT })
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}

  async createTag(input: CreateTagInput) {
    let tag = new Tag();

    let tagDb = await this.tagRepo.findByName(input.tag_name);
    if (tagDb) {
      throw new BadRequestException(ErrorMessage.TAG_EXITS);
    }

    tag.tag_name = input.tag_name;

    return await this.tagRepo.create(tag);
  }

  async getAllTag(queryParams: PaginationInput) {
    const { page = 1, limit = 10 } = queryParams;

    const [tags, total] = await this.tagRepo.findAll({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      total,
      totalPages,
      currentPage: page,
      tags,
    };
  }
}
