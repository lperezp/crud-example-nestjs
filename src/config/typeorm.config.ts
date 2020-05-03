import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const DB_CONFIG = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: process.env.RDS_HOSTNAME || DB_CONFIG.type,
  host: process.env.RDS_PORT || DB_CONFIG,
  port: process.env.RDS_USERNAME || DB_CONFIG.port,
  username: process.env.RDS_HOSTNAME || DB_CONFIG.username,
  password: process.env.RDS_PASSWORD || DB_CONFIG.password,
  database: process.env.RDS_DB_NAME || DB_CONFIG.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC || DB_CONFIG.synchronize,
};
