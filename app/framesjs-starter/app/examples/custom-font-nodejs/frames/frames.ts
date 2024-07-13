import { createFrames } from 'frames.js/next';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { appURL } from '../../../utils';

export const frames = createFrames({
  basePath: '/examples/custom-font-nodejs/frames',
  baseUrl: appURL(),
  debug: process.env.NODE_ENV === 'development',
  imageRenderingOptions: async () => {
    const interRegularFont = fs.readFile(path.join(path.resolve(process.cwd(), 'public'), 'Inter-Regular.ttf'));

    const interBoldFont = fs.readFile(path.join(path.resolve(process.cwd(), 'public'), 'Inter-Bold.ttf'));

    const firaScriptFont = fs.readFile(path.join(path.resolve(process.cwd(), 'public'), 'FiraCodeiScript-Regular.ttf'));
    const [interRegularFontData, interBoldFontData, firaScriptData] = await Promise.all([
      interRegularFont,
      interBoldFont,
      firaScriptFont,
    ]);
    return {
      imageOptions: {
        fonts: [
          {
            data: interRegularFontData,
            name: 'Inter',
            weight: 400,
          },
          {
            data: interBoldFontData,
            name: 'Inter',
            weight: 700,
          },
          {
            data: firaScriptData,
            name: 'Fira Code',
            weight: 700,
          },
        ],
      },
    };
  },
});
