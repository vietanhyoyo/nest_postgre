import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorMessage } from 'src/common/enum/error.message.enum';
import { StatusUser } from 'src/common/enum/user.enum';
import { UserRepository } from 'src/repositories/user.repositories';
import { compare } from 'bcrypt';
import { LoginInput } from 'src/services/types/auth_types/login.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validate(user: LoginInput) {
    const userInDb = await this.userRepo.findByEmail(user.email);
    if (!userInDb) {
      throw new BadRequestException(ErrorMessage.USER_NOT_FOUND);
    } else {
      switch (userInDb.status) {
        case StatusUser.DISABLE:
          throw new BadRequestException(ErrorMessage.USER_INACTIVE);

        case StatusUser.ENABLE:
          if (!(await compare(user.password, userInDb.password))) {
            throw new BadRequestException(ErrorMessage.INCORRECT_USER);
          }
          break;
        default:
          break;
      }
    }
    const payload = {
      user_id: userInDb.user_id,
      role: userInDb.role,
      user_name: userInDb.user_name,
    };
    return await this.login(payload);
  }

  async login(payload: any) {
    return {
      access_token: this.jwtService.sign(payload),
      user_id: payload.user_id,
      role: payload.role,
      user_name: payload.user_name
    };
  }
}
