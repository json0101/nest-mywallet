import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     // whitelist: true,
  //     // transform: true,
  //     // forbidNonWhitelisted: true,
  //     //  transformOptions: {
  //     //   enableImplicitConversion: true,
  //     // },
  //   }),
  // );
  //app.useGlobalFilters(new HttpExceptionFilter());
  const options = new DocumentBuilder()
  .setTitle('My Wallet')
  .setDescription('My Wallet application')
  .setVersion('1.0')
  .build();
  
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
  
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
