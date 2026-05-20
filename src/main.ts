import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔓 Habilitar CORS para permitir peticiones desde tu frontend
  app.enableCors(); 

  await app.listen(3000);
}
bootstrap();