/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { redirect } from 'frames.js/core';
import { frames } from './frames';

const handleRequest = frames(async (ctx) => {
  if (ctx.pressedButton?.action === 'post_redirect') {
    // Do something with the POST

    // when post_redirect button is clicked you must return a redirect response
    return redirect('https://google.com');
  }

  return {
    buttons: [<Button action="post_redirect">Google</Button>],
    image: (
      <div tw="flex flex-col">
        <div tw="flex">Post redirect example</div>
      </div>
    ),
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
