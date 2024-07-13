/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { frames } from './frames';

const handler = frames(async (ctx) => {
  const currentState = ctx.state;

  const updatedState = {
    ...currentState,
    count: ctx.pressedButton ? currentState.count + 1 : currentState.count,
  };

  return {
    buttons: [<Button action="post">Increment</Button>],
    image: <div tw="flex">Count: {updatedState.count}</div>,
    state: updatedState,
  };
});

export const GET = handler;
export const POST = handler;
