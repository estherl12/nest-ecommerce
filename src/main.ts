import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyparser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  const config = new DocumentBuilder()
  .setTitle('E-commerce Api')
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('ecommerce', app, document);
  await app.listen(3003,()=>{
    console.log("Server running on port 3003");
    
  });
}
bootstrap();

