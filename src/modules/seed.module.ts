import { Permission } from '@/entities/permission';
import { Role } from '@/entities/role';
import { User } from '@/entities/user';
import { PermissionRepository } from '@/repositories/permission.repositories';
import { RoleRepository } from '@/repositories/role.repositories';
import { UserRepository } from '@/repositories/user.repositories';
import { SeedService } from '@/services/seed.service';
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, User])],
  providers: [SeedService, RoleRepository, PermissionRepository, UserRepository],
})
export class SeedModule {}
