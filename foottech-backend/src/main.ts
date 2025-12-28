import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para la API
  app.setGlobalPrefix('api');

  // Habilitar CORS para todos los orígenes (útil en desarrollo)
  // En producción limita origin a tus dominios y ajusta `credentials` según sea necesario
  app.enableCors({ origin: true, credentials: true });

  // Pipe de validación global
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('FootTech API')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const httpAdapter = app.getHttpAdapter();
  const expressApp = httpAdapter && typeof httpAdapter.getInstance === 'function' ? httpAdapter.getInstance() : null;
  if (expressApp && typeof expressApp.set === 'function') {
    expressApp.set('nestApp', app);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
