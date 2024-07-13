import { createFrames } from 'frames.js/next';
import { appURL } from '../../../utils';

export const frames = createFrames({
  basePath: '/examples/custom-font-edge/frames',
  baseUrl: appURL(),
  debug: process.env.NODE_ENV === 'development',
  imageRenderingOptions: async () => {
    const interRegularFont = fetch(new URL('/public/Inter-Regular.ttf', import.meta.url)).then((res) =>
      res.arrayBuffer(),
    );
    const interBoldFont = fetch(new URL('/public/Inter-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer());
    const firaScriptFont = fetch(new URL('/public/FiraCodeiScript-Regular.ttf', import.meta.url)).then((res) =>
      res.arrayBuffer(),
    );

    const [interRegularFontData, interBoldFontData, firaScriptFontData] = await Promise.all([
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
            data: firaScriptFontData,
            name: 'Fira Code',
            weight: 700,
          },
        ],
      },
    };
  },
});
