import { News } from '@/entities/news';
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class NewsRepository {
  constructor(
    @InjectRepository(News)
    private repo: Repository<News>,
  ) {}

  async findById(id: number): Promise<News | null> {
    return this.repo.findOne({
      where: { news_id: id },
    });
  }

  async findByTitle(title: string) {
    return this.repo.findOne({
      where: { title: title },
    });
  }

  async findBySlug(slug: string): Promise<News | null> {
    return this.repo.findOne({
      where: { slug },
    });
  }

  async create(news: News) {
    const newsResult = await this.repo.save(news);
    return newsResult;
  }

  async findAll(paginationOptions: {
    skip: number;
    take: number;
  }): Promise<[News[], number]> {
    const [news, total] = await this.repo.findAndCount({
      skip: paginationOptions.skip,
      take: paginationOptions.take,
      order: {
        updatedAt: 'DESC',
      },
      relations: ['tags'],
    });

    return [news, total];
  }

  async update(updateData: Partial<News>): Promise<News> {
    await this.repo.save(updateData);
    return this.repo.findOne({
      where: { news_id: updateData.news_id },
      relations: ['tags'],
    });
  }

  async deleteIdolById(newsId: number): Promise<void> {
    const idol = await this.repo.findOne({
      where: { news_id: newsId },
      relations: ['tags'],
    });

    if (!idol) {
      throw new Error('Idol not found');
    }

    await this.repo
      .createQueryBuilder()
      .relation(News, 'tags')
      .of(newsId)
      .remove(idol.tags);

    await this.repo.delete(newsId);
  }
}
