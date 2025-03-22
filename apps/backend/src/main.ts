import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, LogLevel } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      logLevels: getLogLevels(process.env.NODE_ENV === 'production'),
      json: true,
      colors: true,
    }),
  });

  app.enableCors({
    origin: 'http://localhost:5173', // Your React Remix frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies & authentication headers
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

function getLogLevels(isProduction: boolean): LogLevel[] {
  if (isProduction) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
}
