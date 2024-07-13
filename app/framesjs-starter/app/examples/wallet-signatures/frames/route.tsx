/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { frames } from './frames';

const handleRequest = frames(async (ctx) => {
  if (ctx.message?.transactionId) {
    return {
      buttons: [
        <Button action="post" target="/">
          Reset
        </Button>,
      ],
      image: (
        <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex">
          Signature submitted! {ctx.message.transactionId}
        </div>
      ),
      imageOptions: {
        aspectRatio: '1:1',
      },
    };
  }

  return {
    buttons: [
      <Button action="tx" target="/signature-data" post_url="/">
        Sign data
      </Button>,
    ],
    image: (
      <div tw="bg-purple-800 text-white w-full h-full justify-center items-center">Sign data using your wallet</div>
    ),
    imageOptions: {
      aspectRatio: '1:1',
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
