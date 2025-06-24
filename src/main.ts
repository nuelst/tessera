import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tessera API')
    .setDescription('The Tessera API description')
    .setVersion('1.0')
    .addTag('tessera')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/json',
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
}
bootstrap();
