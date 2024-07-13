/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { frames } from './frames';

const handler = frames((ctx) => {
  let { state } = ctx;

  // eslint-disable-next-line default-case
  switch (ctx.searchParams.action) {
    case 'increment':
      state = { ...state, count: state.count + 1 };
      break;
    case 'decrement':
      state = { ...state, count: state.count - 1 };
      break;
  }

  return {
    buttons: [
      <Button action="post" target={{ query: { action: 'increment' } }}>
        Increment
      </Button>,
      <Button action="post" target={{ query: { action: 'decrement' } }}>
        Decrement
      </Button>,
    ],
    image: <div tw="flex">Count: {state.count}</div>,
    state,
  };
});

export const GET = handler;
export const POST = handler;
