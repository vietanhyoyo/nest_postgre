import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/src/config/env/dev.env` });

import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [__dirname + '../../../entities/*{.ts,.js}'],
  migrations: [__dirname + '../../../migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});


// export default new DataSource({
//   type: 'postgres',
//   host: "45.79.198.164",
//   port: 5434,
//   username: "kol_use",
//   password: "Kol-password%08-2024",
//   database: "kol_postgres",
//   entities: [__dirname + '../../../entities/*{.ts,.js}'],
//   migrations: [__dirname + '../../../migrations/*{.ts,.js}'],
//   migrationsTableName: 'migrations',
// });
