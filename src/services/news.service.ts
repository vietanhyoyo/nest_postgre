import { NewsRepository } from '@/repositories/news.repositories';
import { TagRepository } from '@/repositories/tag.repositories';
import { Injectable, Scope } from '@nestjs/common';
import { PaginationInput } from './types/pagination_types/pagination.input';

@Injectable({ scope: Scope.DEFAULT })
export class NewsService {
  constructor(
    private readonly newsRepo: NewsRepository,
    private readonly tagRepo: TagRepository,
  ) {}

  async getAllNews(queryParams: PaginationInput) {
    const { page = 1, limit = 10 } = queryParams;

    const [news, total] = await this.newsRepo.findAll({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      total,
      totalPages,
      currentPage: page,
      news,
    };
  }
}
