/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { frames } from './frames';

const handler = frames(async (ctx) => {
  return {
    buttons: [
      <Button action="post" target="/nodejs">
        Node.js runtime
      </Button>,
      <Button action="post" target="/edge">
        Edge function
      </Button>,
    ],
    image: <div tw="flex">Custom fonts example</div>,
  };
});

export const GET = handler;
export const POST = handler;
