/* eslint-disable react/jsx-key */

import { NextRequest } from 'next/server';
import { Button } from 'frames.js/next';
import { frames } from '../frames';

const handler = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
  // eslint-disable-next-line no-return-await
  return await frames(async (ctx) => {
    return {
      buttons: [
        <Button action="post" target="/">
          ← Back
        </Button>,
      ],
      image: <div tw="flex">You are on frame &quot;{id}&quot;. Try loading this URL with a GET request.</div>,
      title: `Frame ${id}`,
    };
  })(req);
};

export const GET = handler;
export const POST = handler;
