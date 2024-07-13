import { createFrames } from 'frames.js/next';
import { appURL } from '../../../utils';

export const frames = createFrames({
  basePath: '/examples/inline-images/frames',
  baseUrl: appURL(),

  debug: process.env.NODE_ENV === 'development',
  // Setting imagesRoute to null disables the images worker middleware
  imagesRoute: null,
});
