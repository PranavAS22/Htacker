import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express'; // ✅ Add this import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '10mb' }));          
  app.use(urlencoded({ extended: true, limit: '10mb' })); 

  app.enableCors({
    origin: ['http://localhost:8081'], 
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(3000, '0.0.0.0'); 
  console.log('Server running on http://localhost:3000');
}
bootstrap();
