import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://morocco-safety-web.onrender.com'
    ],
    credentials: true,
  });

  const uploadsPath = path.join(process.cwd(), 'uploads');
  console.log('📁 Servir les uploads depuis:', uploadsPath);
  app.use('/uploads', express.static(uploadsPath));
  app.use(express.static(uploadsPath));
  console.log('🌍 MONGO_URI:', process.env.MONGO_URI);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
