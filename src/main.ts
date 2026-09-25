import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Rejects request bodies that do not match the DTO classes.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  // Light Cloud passes the port in PORT; 3000 is for your own machine.
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
