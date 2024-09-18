import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import * as path from 'path';

config({ path: path.join(__dirname, 'src', 'config', 'env', '.env') });

const configService = new ConfigService();

// export default new DataSource({
//   type: 'postgres',
//   host: configService.get('DATABASE_HOST'),
//   port: configService.get('DATABASE_PORT'),
//   username: configService.get('DATABASE_USER'),
//   password: configService.get('DATABASE_PASSWORD'),
//   database: configService.get('DATABASE_DB'),
//   entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
//   migrationsTableName: 'migrations',
// });


export default new DataSource({
  type: 'postgres',
  host: "45.79.198.164",
  port: 5434,
  username: "kol_use",
  password: "Kol-password%08-2024",
  database: "kol_postgres",
  entities: [__dirname + '../../../entities/*{.ts,.js}'],
  migrations: [__dirname + '../../../migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
