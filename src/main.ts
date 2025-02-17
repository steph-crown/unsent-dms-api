import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors.
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://weoutsideapp.co',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // swagger setup starts
  const config = new DocumentBuilder()
    .setTitle('unsent dms')
    .setDescription('unsent dms')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('swagger', app, documentFactory, {
      customSiteTitle: 'unsent dms',
      swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
