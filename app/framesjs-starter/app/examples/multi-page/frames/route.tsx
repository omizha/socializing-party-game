/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { frames } from './frames';

const handler = frames(async () => {
  return {
    buttons: [
      // With query params
      <Button action="post" target={{ pathname: '/route1', query: { foo: 'bar' } }}>
        Go to route 1
      </Button>,
      // Without query params
      <Button action="post" target="/route2">
        Go to route 2
      </Button>,
    ],
    image: <div tw="flex">Welcome</div>,
  };
});

export const GET = handler;
export const POST = handler;
