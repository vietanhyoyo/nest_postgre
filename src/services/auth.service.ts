import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorMessage } from 'src/common/enum/error.message.enum';
import { StatusUser } from 'src/common/enum/user.enum';
import { UserRepository } from 'src/repositories/user.repositories';
import { compare } from 'bcrypt';
import { LoginInput } from 'src/services/types/auth_types/login.input';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { InvalidatedTokenRepository } from '@/repositories/invalidated_token.repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly invalidatedTokenRepo: InvalidatedTokenRepository,
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

    let roles = [];
    let permissionsSet = new Set<string>();
    for (let i = 0; i < userInDb.role.length; i++) {
      const role = userInDb.role[i];
      roles.push(role.name);
      
      for (let j = 0; j < role.permissions.length; j++) {
        permissionsSet.add(role.permissions[j].name);
      }
    }
    
    const permissions = Array.from(permissionsSet);
    const tokenId = uuidv4();

    const payload = {
      token_id: tokenId,
      user_id: userInDb.user_id,
      roles: roles,
      permissions: permissions,
      user_name: userInDb.user_name,
    };
    return await this.login(payload);
  }

  async login(payload: any) {
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '3d',
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
}
