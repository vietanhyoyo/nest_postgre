import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag';
import { TagRepository } from 'src/repositories/tag.repositories';
import { News } from '@/entities/news';
import { NewsController } from '@/controllers/news.controller';
import { NewsService } from '@/services/news.service';
import { NewsRepository } from '@/repositories/news.repositories';

@Module({
  imports: [TypeOrmModule.forFeature([News]), TypeOrmModule.forFeature([Tag])],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository, TagRepository],
})
export class NewsModule {}
