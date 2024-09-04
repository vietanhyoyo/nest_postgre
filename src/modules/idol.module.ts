import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdolController } from 'src/controllers/idol.controller';
import { Idol } from 'src/entities/idol';
import { IdolRepository } from 'src/repositories/idol.repositories';
import { IdolService } from 'src/services/idol.service';
import { Tag } from 'src/entities/tag';
import { TagRepository } from 'src/repositories/tag.repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Idol]), TypeOrmModule.forFeature([Tag])],
  controllers: [IdolController],
  providers: [IdolService, IdolRepository, TagRepository],
})
export class IdolModule {}
