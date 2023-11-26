import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Nome do Seu Aplicativo')
    .setDescription('Descrição do Seu Aplicativo')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // O servidor vai escutar no endereço IP 192.168.15.43 na porta 3000
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
 