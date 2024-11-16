import { InvalidatedToken } from '@/entities/invalidated_token';
import { InvalidatedTokenRepository } from '@/repositories/invalidated_token.repositories';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([InvalidatedToken])],
  providers: [JwtStrategy, InvalidatedTokenRepository],
})
export class GlobalModule {}
