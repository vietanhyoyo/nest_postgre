import { Role } from '@/entities/role';
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private repo: Repository<Role>,
  ) {}

  async isRoleTableEmpty(): Promise<boolean> {
    const count = await this.repo.count();
    return count === 0;
  }
  
  async create(role: Role) {
    const newRole = await this.repo.save(role);
    return newRole;
  }
}