import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Router Monitor API')
    .setDescription('Router Monitor API')
    .setVersion('1.0')
    .addTag('auth', 'Authentication routes')
    .addTag('agents', 'Agents manipulation routes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const transformOptions = {
    excludeExtraneousValues: true,
  };
  const reflector = app.get(Reflector);
  app.useGlobalPipes(new ValidationPipe({ transformOptions }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector, transformOptions));

  await app.listen(3000);
}
bootstrap();
