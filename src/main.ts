import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { json } from 'express';

async function rumpke() {
  const app = await NestFactory.create(AppModule);
  app.use(json());



  // ValidationPipe temporarily removed for debugging body parsing



  app.enableCors({
    origin: [
      'https://ichschenkedirwas.de',
      'https://www.ichschenkedirwas.de'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
rumpke();
