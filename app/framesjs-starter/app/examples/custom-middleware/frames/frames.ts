import { createFrames } from 'frames.js/next';
import { FramesMiddleware } from 'frames.js/types';

type PriceContext = { ethPrice?: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const priceMiddleware: FramesMiddleware<any, PriceContext> = async (ctx, next) => {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const {
      ethereum: { usd: ethPrice },
    } = await res.json();
    return next({ ethPrice });
  } catch (error) {
    console.error('Error fetching ETH price:', error);
  }
  return next();
};

export const frames = createFrames({
  basePath: '/examples/custom-middleware/frames',
  debug: process.env.NODE_ENV === 'development',
  initialState: {
    pageIndex: 0,
  },
  middleware: [priceMiddleware],
});
