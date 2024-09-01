import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdolController } from 'src/controllers/idol.controller';
import { Idol } from 'src/entities/idol';
import { IdolRepository } from 'src/repositories/idol.repositories';
import { IdolService } from 'src/services/idol.service';

@Module({
  imports: [TypeOrmModule.forFeature([Idol])],
  controllers: [IdolController],
  providers: [IdolService, IdolRepository],
})
export class IdolModule {}
