import { Role } from '@/entities/role';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import { User } from 'src/entities/user';
import { UserRepository } from 'src/repositories/user.repositories';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
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
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtService],
  exports: [UserRepository],
})
export class UserModule {}
