import { createImagesWorker } from 'frames.js/middleware/images-worker/next';
import path from 'path';
import { readFileSync } from 'fs';

const interRegular = readFileSync(path.join(path.resolve(process.cwd(), 'public'), 'Inter-Regular.ttf'));

const interBoldFont = readFileSync(path.join(path.resolve(process.cwd(), 'public'), 'Inter-Bold.ttf'));

const imagesRoute = createImagesWorker({
  imageOptions: {
    fonts: [
      {
        data: interRegular,
        name: 'Inter',
        weight: 400,
      },
      {
        data: interBoldFont,
        name: 'Inter',
        weight: 700,
      },
    ],
  },
  secret: 'SOME_SECRET_VALUE',
});

export const GET = imagesRoute();
