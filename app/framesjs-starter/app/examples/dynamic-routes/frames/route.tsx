/* eslint-disable react/jsx-key */

import { Button } from 'frames.js/next';
import { frames } from './frames';

const handler = frames(async (ctx) => {
  if (ctx.message?.inputText) {
    return {
      buttons: [
        <Button action="post" target={ctx.message.inputText}>
          {`Go to /${ctx.message.inputText}`}
        </Button>,
      ],
      image: <div>Press the button to visit the path</div>,
    };
  }

  return {
    buttons: [<Button action="post">Go</Button>],
    image: <div>Enter a path to load</div>,
    textInput: 'Enter path',
  };
});

export const GET = handler;
export const POST = handler;
