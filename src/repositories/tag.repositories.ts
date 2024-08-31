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

  async findAll() {
    return this.repo.find();
  }

  async findByName(name: string) {
    return this.repo.findOne({
      where: { tag_name: name },
    });
  }

  async create(tag: Tag) {
    const newTag = await this.repo.save(tag);
    return newTag;
  }
}
