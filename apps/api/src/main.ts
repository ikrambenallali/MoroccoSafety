import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  // 📁 Servir les fichiers statiques depuis le dossier uploads
  const uploadsPath = path.join(process.cwd(), 'uploads');
  console.log('📁 Servir les uploads depuis:', uploadsPath);
  app.use('/uploads', express.static(uploadsPath));
  app.use(express.static(uploadsPath));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
