import { NewsRepository } from '@/repositories/news.repositories';
import { TagRepository } from '@/repositories/tag.repositories';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { PaginationInput } from './types/pagination_types/pagination.input';
import { News } from '@/entities/news';
import { CreateNewsInput } from './types/news_types/create.news.input';
import { ErrorMessage } from '@/common/enum/error.message.enum';
import { Helper } from '@/common/helper';
import { UpdateNewsInput } from './types/news_types/update.news.input';

@Injectable({ scope: Scope.DEFAULT })
export class NewsService {
  constructor(
    private readonly newsRepo: NewsRepository,
    private readonly tagRepo: TagRepository,
  ) {}

  async createNews(input: CreateNewsInput) {
    let news = new News();

    let newsDb = await this.newsRepo.findByTitle(input.title);
    if (newsDb) {
      throw new BadRequestException(ErrorMessage.DATA_EXITS);
    }

    news.title = input.title;
    news.thumbnail = input.thumbnail;
    news.slug = Helper.convertToSlug(input.title);
    news.author = input.author;
    news.description = input.description;
    news.content = input.content;
    news.tags = input.tags;

    return await this.newsRepo.create(news);
  }

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

  async updateNews(input: UpdateNewsInput) {
    const news = await this.newsRepo.findById(input.news_id);

    if (!news) {
      throw new NotFoundException(ErrorMessage.DATA_NOT_FOUND);
    }

    news.title = input.title;
    news.thumbnail = input.thumbnail;
    news.slug = Helper.convertToSlug(input.title);
    news.author = input.author;
    news.description = input.description;
    news.content = input.content;
    news.tags = input.tags;

    const updatedNews = await this.newsRepo.update(news);

    return updatedNews;
  }

  async removeNews(newsId: number): Promise<void> {
    const news = await this.newsRepo.findById(newsId);

    if (!news) {
      throw new NotFoundException(ErrorMessage.DATA_NOT_FOUND);
    }
    await this.newsRepo.deleteNewsById(newsId);
  }

  async getNewsBySlug(slug: string) {
    const newsDb = await this.newsRepo.findBySlug(slug);
    if (!newsDb) {
      throw new BadRequestException(ErrorMessage.NEWS_NOT_FOUND);
    }
    return newsDb;
  }
}
