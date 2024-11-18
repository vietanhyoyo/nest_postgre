import RoleEnum from '@/common/enum/role.enum';
import { hash } from 'bcrypt';
import { PermissionRepository } from '@/repositories/permission.repositories';
import { RoleRepository } from '@/repositories/role.repositories';
import { UserRepository } from '@/repositories/user.repositories';
import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { StatusUser } from '@/common/enum/user.enum';
import { User } from '@/entities/user';

@Injectable({ scope: Scope.DEFAULT })
export class SeedService implements OnModuleInit {
  constructor(
    private readonly roleRepo: RoleRepository,
    private readonly permissionRepo: PermissionRepository,
    private readonly userRepo: UserRepository,
  ) {}

  onModuleInit() {
    this.seed();
  }

  // Initial data
  async seed() {
    if (this.permissionRepo.isPermissionTableEmpty()) {
      // Create permissions
      const per1 = await this.permissionRepo.create({
        name: 'CREATE_USER',
        description: 'create user',
      });

      const per2 = await this.permissionRepo.create({
        name: 'UPDATE_USER',
        description: 'update user',
      });

      // Create roles
      if (this.roleRepo.isRoleTableEmpty()) {
        this.roleRepo.create({
          name: RoleEnum.NORMAL,
          description: 'normal user',
          permissions: [],
        });

        const adminUser = await this.roleRepo.create({
          name: RoleEnum.ADMIN,
          description: 'admin user',
          permissions: [per1, per2],
        });

        // Create admin user
        if (this.userRepo.isUserTableEmpty()) {
          let user = new User();

          user.email = 'admin@gmail.com';
          user.user_name = 'admin';
          user.role = adminUser;
          user.password = await hash('admin', 12);

          this.userRepo.create(user);
        }
      }
    }
  }
}
