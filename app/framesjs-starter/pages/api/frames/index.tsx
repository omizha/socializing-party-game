/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next/pages-router/server';
import { frames } from './frames';

const handleRequest = frames(async (ctx) => {
  return {
    buttons: [
      <Button action="post">Click me</Button>,
      <Button action="post" target="/next">
        Next frame
      </Button>,
    ],
    image: (
      <span>
        Hello there: {ctx.pressedButton ? '✅' : '❌'}
        {ctx.message?.inputText ? `, Typed: ${ctx.message?.inputText}` : ''}
      </span>
    ),
    textInput: 'Type something!',
  };
});

export default handleRequest;
