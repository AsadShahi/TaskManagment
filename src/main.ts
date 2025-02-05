import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation dto it is essential
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
