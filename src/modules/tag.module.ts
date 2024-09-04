import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from 'src/controllers/tag.controller';
import { Tag } from 'src/entities/tag';
import { TagRepository } from 'src/repositories/tag.repositories';
import { TagService } from 'src/services/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService, TagRepository],
})
export class TagModule {}
