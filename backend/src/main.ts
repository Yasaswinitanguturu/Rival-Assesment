import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Ensure this matches your file name

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // This allows the React app to talk to the NestJS app
  await app.listen(3000);
}

bootstrap();