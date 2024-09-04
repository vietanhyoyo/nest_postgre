import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { AuthController } from 'src/controllers/auth.controller';
import { User } from 'src/entities/user';
import { UserRepository } from 'src/repositories/user.repositories';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
