import { imagesWorkerMiddleware } from 'frames.js/middleware/images-worker';
import { createFrames } from 'frames.js/next';
import { appURL } from '../../../utils';

export const frames = createFrames({
  basePath: '/examples/images-worker',
  baseUrl: appURL(),
  debug: process.env.NODE_ENV === 'development',
  middleware: [
    imagesWorkerMiddleware({
      imagesRoute: '/images',
      secret: 'SOME_SECRET_VALUE',
    }),
  ],
});
