import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import Logger for register in log
import { Logger } from '@nestjs/common';

import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const CONFIG_SERVER = config.get('server');

  const port = process.env.PORT || CONFIG_SERVER.port;
  await app.listen(port);
  logger.log(`Aplication listening on port ${port}`);
}
bootstrap();
