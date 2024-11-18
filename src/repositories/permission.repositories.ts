import { Permission } from '@/entities/permission';
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private repo: Repository<Permission>,
  ) {}

  async isPermissionTableEmpty(): Promise<boolean> {
    const count = await this.repo.count();
    return count === 0;
  }

  async create(permission: Permission) {
    const newPermission = await this.repo.save(permission);
    return newPermission;
  }
}