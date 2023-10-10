import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.SERVER_NAME)
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('VACCINATION HISTORY')
    .setDescription('Microservice dùng để cập nhật quá trình và tiêm vaccine của khách hàng')
    .setVersion('1.0')
    .setContact('White Hat', '', 'truonggolang@gmail.com')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(process.env.SERVER_NAME, app, document)
  //endSwagger

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: 'https://healthline.vn',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  })

  await app.listen(3002);
}
bootstrap();
