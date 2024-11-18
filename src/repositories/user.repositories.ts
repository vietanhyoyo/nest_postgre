import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async findById(id: number) {
    return this.repo.findOne({
      where: { user_id: id },
    });
  }

  async findByEmail(email: string) {
    return this.repo.findOne({
      where: { email: email },
    });
  }

  async create(user: User) {
    const userdb = await this.repo.save(user);
    return await this.findById(userdb.user_id);
  }

  async findAll(paginationOptions: { skip: number, take: number }): Promise<[User[], number]> {
    const [users, total] = await this.repo.findAndCount({
      skip: paginationOptions.skip,
      take: paginationOptions.take,
    });

    return [users, total];
  }

  async isUserTableEmpty(): Promise<boolean> {
    const count = await this.repo.count();
    return count === 0;
  }
}
