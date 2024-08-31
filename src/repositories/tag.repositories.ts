import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class TagRepository {
  constructor(
    @InjectRepository(Tag)
    private repo: Repository<Tag>,
  ) {}

  async findByName(name: string) {
    return this.repo.findOne({
      where: { tag_name: name },
    });
  }

  async create(tag: Tag) {
    const newTag = await this.repo.save(tag);
    return newTag;
  }

  async findAll(paginationOptions: {
    skip: number;
    take: number;
  }): Promise<[Tag[], number]> {
    const [tags, total] = await this.repo.findAndCount({
      skip: paginationOptions.skip,
      take: paginationOptions.take,
    });

    return [tags, total];
  }
}
