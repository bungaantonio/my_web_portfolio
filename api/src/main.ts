import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverless from 'serverless-http';

const server = express();

const bootstrapServer = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Prefixo global e CORS
  app.setGlobalPrefix('api/v1');
  app.enableCors();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Meu Portfólio Web - API')
    .setDescription('Documentação da API do portfólio profissional do Manuel Jaime')
    .setVersion('1.0')
    .addTag('projects')
    .addTag('contacts')
    .addTag('experiences')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.init();

  return server;
};

// Exporta o handler serverless para Vercel
let handler: any;
(async () => {
  const server = await bootstrapServer();
  handler = serverless(server);
})();
export { handler };
