import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { JwtAuthGuard } from './common/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { GlobalModule } from './modules/global.module';
import { TagModule } from './modules/tag.module';
import { IdolModule } from './modules/idol.module';
import { NewsModule } from './modules/news.module';
import { SeedModule } from './modules/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    GlobalModule,
    PassportModule,
    DatabaseModule,
    SeedModule,
    UserModule,
    AuthModule,
    TagModule,
    IdolModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
