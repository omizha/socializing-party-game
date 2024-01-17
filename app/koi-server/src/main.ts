import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import type { Callback, Context, Handler } from 'aws-lambda';
import { type INestApplication, VersioningType } from '@nestjs/common';
import { AppModule } from './app/app.module';

let server: Handler;

export function commonConfig(app: INestApplication): void {
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.enableCors({
    credentials: true,
    origin: [
      'http://local.parete.me',
      'https://local.parete.me',
      'http://local.parete.me:5173',
      'https://local.parete.me:5173',
    ],
  });
}

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  commonConfig(app);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event: unknown, context: Context, callback: Callback) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
