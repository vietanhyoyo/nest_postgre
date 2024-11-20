import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ErrorMessage } from 'src/common/enum/error.message.enum';
import { StatusUser } from 'src/common/enum/user.enum';
import { UserRepository } from 'src/repositories/user.repositories';
import { compare } from 'bcrypt';
import { LoginInput } from 'src/services/types/auth_types/login.input';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { InvalidatedTokenRepository } from '@/repositories/invalidated_token.repositories';
import { User } from '@/entities/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly invalidatedTokenRepo: InvalidatedTokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  refreshTokenExpiry = '3d';

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

    const payload = this.createPayload(userInDb);

    return await this.login(payload);
  }

  async login(payload: any) {
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: this.refreshTokenExpiry,
      }),
      payload: payload,
    };
  }

  async logout(token: string) {
    const decodedToken = this.jwtService.decode(token);
    const tokenId = decodedToken.token_id;
    const exp = decodedToken.exp;
    const expiry_time = new Date(exp * 1000);

    await this.invalidatedTokenRepo.create({
      id: tokenId,
      expiry_time,
    });
  }

  async refresh(refreshToken: string) {
    try {
      await this.jwtService.verifyAsync(refreshToken);

      const decodedToken = this.jwtService.decode(refreshToken) as any;

      const { user_id: userId, token_id: tokenId } = decodedToken;

      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new ForbiddenException(ErrorMessage.USER_NOT_FOUND);
      }

      // Create new payload from user information
      const payload = this.createPayload(user);

      const accessToken = this.jwtService.sign(payload);
      const refreshTokenNew = await this.jwtService.signAsync(payload, {
        expiresIn: this.refreshTokenExpiry,
      });

      return {
        access_token: accessToken,
        refresh_token: refreshTokenNew,
        payload,
      };
    } catch (error) {
      throw new ForbiddenException(error.message || ErrorMessage.ACCESS_DENIED);
    }
  }

  createPayload(user: User) {
    const roles = user.role.map((role) => role.name);
    const permissions = user.role
      .flatMap((role) => role.permissions)
      .map((permission) => permission.name);

    const newTokenId = uuidv4();
    const payload = {
      token_id: newTokenId,
      user_id: user.user_id,
      roles,
      permissions,
      user_name: user.user_name,
    };

    return payload;
  }
}
