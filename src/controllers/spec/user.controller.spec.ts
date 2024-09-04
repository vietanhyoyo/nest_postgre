import { UserService } from 'src/services/user.service';
import { UserController } from 'src/controllers/user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { StatusUser } from 'src/common/enum/user.enum';
import Role from 'src/common/enum/role.enum';
import { UserRes } from 'src/controllers/types/user_types/user.res';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    createUser: jest.fn((dto) => {
      delete dto.password;
      return {
        user_id: 1,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createdUser: UserRes = await controller.create({
      user_name: 'test',
      password: '12345678',
      email: 'test@example.com',
      status: StatusUser.ENABLE,
      role: Role.ADMIN,
    });

    expect(createdUser).toEqual({
      user_id: 1,
      user_name: 'test',
      email: 'test@example.com',
      status: StatusUser.ENABLE,
      role: Role.ADMIN,
    });

    expect(mockUserService.createUser).toHaveBeenCalled();
  });
});
