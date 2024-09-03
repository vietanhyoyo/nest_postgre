import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Idol } from 'src/entities/idol';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class IdolRepository {
  constructor(
    @InjectRepository(Idol)
    private repo: Repository<Idol>,
  ) {}

  async findByName(name: string) {
    return this.repo.findOne({
      where: { idol_name: name },
    });
  }

  async findById(id: number): Promise<Idol | null> {
    return this.repo.findOne({
      where: { idol_id: id },
    });
  }

  async create(idol: Idol) {
    const newIdol = await this.repo.save(idol);
    return newIdol;
  }

  async findAll(paginationOptions: {
    skip: number;
    take: number;
  }): Promise<[Idol[], number]> {
    const [idols, total] = await this.repo.findAndCount({
      skip: paginationOptions.skip,
      take: paginationOptions.take,
      relations: ['tags'],
    });

    return [idols, total];
  }

  async update(updateData: Partial<Idol>): Promise<Idol> {
    await this.repo.save(updateData);
    return this.repo.findOne({ where: { idol_id: updateData.idol_id }, relations: ['tags'] });
  }
}
