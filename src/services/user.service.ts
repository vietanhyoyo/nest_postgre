import { BadRequestException, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repositories';
import { CreateUserInput } from 'src/services/types/user_types/create.user.input';
import { User } from 'src/entities/user';
import { hash } from 'bcrypt';
import { ErrorMessage } from 'src/common/enum/error.message.enum';
import { PaginationInput } from 'src/services/types/pagination_types/pagination.input';
import { RoleRepository } from '@/repositories/role.repositories';
import { UpdateUserInput } from './types/user_types/update.user.input';

@Injectable({ scope: Scope.DEFAULT })
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
  ) {}

  async createUser(input: CreateUserInput) {
    let user = new User();

    let userDb = await this.userRepo.findByEmail(input.email);
    if (userDb) {
      throw new BadRequestException(ErrorMessage.EMAIL_EXITS);
    }

    user.email = input.email;
    user.user_name = input.user_name;
    user.status = input.status;
    user.password = await hash(input.password, 12);

    if (input.roles && input.roles.length > 0) {
      const foundRoles = await this.roleRepo.findByNames(input.roles);
      user.role = foundRoles;
    }

    return await this.userRepo.create(user);
  }

  async getUserById(id: number) {
    let userDb = await this.userRepo.findById(id);
    if (!userDb) {
      throw new BadRequestException(ErrorMessage.USER_NOT_FOUND);
    }
    return userDb;
  }

  async getAllUsers(queryParams: PaginationInput) {
    const { page = 1, limit = 10 } = queryParams;

    const [users, total] = await this.userRepo.findAll({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      total,
      totalPages,
      currentPage: page,
      users,
    };
  }

  async updateUser(input: UpdateUserInput) {
    // Check if user exists by ID
    const user = await this.userRepo.findById(input.user_id);

    if (!user) {
      throw new NotFoundException(ErrorMessage.DATA_NOT_FOUND);
    }

    user.user_name = input.user_name;
    user.status = input.status;
    user.password = await hash(input.password, 12);

    if (input.roles && input.roles.length > 0) {
      const foundRoles = await this.roleRepo.findByNames(input.roles);
      user.role = foundRoles;
    }

    // Save the updated user
    const updatedUser = await this.userRepo.update(user);

    return updatedUser;
  }
}
