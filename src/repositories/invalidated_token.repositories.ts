import { InvalidatedToken } from '@/entities/invalidated_token';
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class InvalidatedTokenRepository {
  constructor(
    @InjectRepository(InvalidatedToken)
    private repo: Repository<InvalidatedToken>,
  ) {}

  async create(invalidatedToken: InvalidatedToken) {
    const invalidToken = await this.repo.save(invalidatedToken);
    return invalidToken;
  }

  async findById(tokenId: string) {
    return this.repo.findOne({
      where: { id: tokenId },
    });
  }
}
