/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { frames } from '../frames';

export const POST = frames(async (ctx) => {
  const { foo } = ctx.searchParams;

  return {
    // foo: bar
    buttons: [
      <Button action="post" target="/">
        Go back
      </Button>,
      <Button action="post" target="/route2">
        Go to route 2
      </Button>,
    ],
    image: <div tw="flex">Route 1 foo: {foo}</div>,
  };
});
