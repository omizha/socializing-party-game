/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { frames } from '../frames';

const handleRequest = frames(async (ctx) => {
  return {
    buttons: [
      <Button action="post" target="/">
        Previous frame
      </Button>,
    ],
    image: <span>This is next frame and you clicked button: {ctx.pressedButton ? '✅' : '❌'}</span>,
  };
});

export const POST = handleRequest;
