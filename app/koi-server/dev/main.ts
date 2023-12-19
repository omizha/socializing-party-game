import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';

// https://docs.nestjs.com/recipes/hot-reload
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}
bootstrap();
