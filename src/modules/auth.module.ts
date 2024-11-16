import { InvalidatedToken } from '@/entities/invalidated_token';
import { InvalidatedTokenRepository } from '@/repositories/invalidated_token.repositories';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { User } from 'src/entities/user';
import { UserRepository } from 'src/repositories/user.repositories';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, InvalidatedToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: `${configService.get('JWT_SECRET')}`,
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, InvalidatedTokenRepository],
})
export class AuthModule {}
