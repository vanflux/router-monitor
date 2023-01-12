import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthGuards } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup globals
  const reflector = app.get(Reflector);
  const authService = app.get(AuthService);
  const transformOptions = { excludeExtraneousValues: true };
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: false, transformOptions }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector, transformOptions));
  app.useGlobalGuards(new AuthGuards(reflector, authService));
  app.enableCors();
  
  // Setup swagger
  const config = new DocumentBuilder()
    .setTitle('Router Monitor API')
    .setDescription('Router Monitor API')
    .setVersion('1.0')
    .addTag('auth', 'Authentication routes')
    .addTag('agents', 'Agents manipulation routes')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
