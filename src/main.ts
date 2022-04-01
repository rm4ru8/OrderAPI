import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const listenPost = 3000;  // 監聽端口

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // swagger添加
  const config = new DocumentBuilder()
  .setTitle('訂單API')
  .setDescription("請依下列規範使用<br/>API技術使用Nestjs框架+Typeorm+MySQL+Swagger")
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);

  console.log(`listen in http://localhost:${listenPost}`);
  await app.listen(listenPost);
}
bootstrap();
