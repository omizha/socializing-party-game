/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { frames } from '../frames';

export const POST = frames(async () => {
  return {
    buttons: [
      <Button action="post" target="/">
        Go to initial route
      </Button>,
      <Button action="post" target={{ pathname: '/route1', query: { foo: 'baz' } }}>
        Go to route 1
      </Button>,
    ],
    image: <div tw="flex">Route 2</div>,
  };
});
