/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { frames } from './frames';

const handler = frames(async (ctx) => {
  return {
    buttons: [<Button action="post">Refresh</Button>],
    image: <div tw="flex">ETH price: ${ctx.ethPrice}</div>,
  };
});

export const GET = handler;
export const POST = handler;
