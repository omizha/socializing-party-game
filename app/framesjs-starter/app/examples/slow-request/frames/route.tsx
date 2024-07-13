import { kv } from '@vercel/kv';
import { types } from 'frames.js/core';
import { Button } from 'frames.js/next';
import { RandomNumberRequestStateValue } from '../slow-fetch/types';
import { frames } from './frames';

const handleRequest = frames(async (ctx) => {
  const initialFrame = {
    buttons: [
      <Button action="post" key="1">
        Generate
      </Button>,
    ],
    image: (
      <div tw="w-full h-full bg-slate-700 text-white justify-center items-center">
        This random number generator takes 10 seconds to respond
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } satisfies types.FrameDefinition<any>;

  const checkStatusFrame = {
    buttons: [
      <Button action="post" key="1">
        Check status
      </Button>,
    ],
    image: <div tw="w-full h-full bg-slate-700 text-white justify-center items-center">Loading...</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } satisfies types.FrameDefinition<any>;

  if (!ctx.message) {
    return initialFrame;
  }

  const { requesterFid } = ctx.message;
  const uniqueId = `fid:${requesterFid}`;

  const existingRequest = await kv.get<RandomNumberRequestStateValue>(uniqueId);

  if (existingRequest) {
    // eslint-disable-next-line default-case
    switch (existingRequest.status) {
      case 'pending':
        return checkStatusFrame;
      case 'success': {
        if (ctx.url.searchParams.get('reset') === 'true') {
          // reset to initial state
          await kv.del(uniqueId);
        }

        return {
          buttons: [
            <Button action="post" key="1" target={{ pathname: '/', query: { reset: true } }}>
              Reset
            </Button>,
          ],
          image: (
            <div tw="w-full h-full bg-slate-700 text-white justify-center items-center flex">
              The number is {existingRequest.data}
            </div>
          ),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } satisfies types.FrameDefinition<any>;
      }
      case 'error': {
        if (ctx.url.searchParams.get('retry') === 'true') {
          // reset to initial state
          await kv.del(uniqueId);

          return initialFrame;
        }
        return {
          buttons: [
            <Button action="post" key="1" target={{ pathname: '/', query: { retry: true } }}>
              Retry
            </Button>,
          ],
          image: <span>{existingRequest.error}</span>,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } satisfies types.FrameDefinition<any>;
      }
    }
  } else {
    await kv.set<RandomNumberRequestStateValue>(
      uniqueId,
      {
        status: 'pending',
        timestamp: new Date().getTime(),
      },
      // set as pending for one minute
      { ex: 60 },
    );

    // start request, don't await it! Return a loading page, let this run in the background
    fetch(new URL('/examples/slow-request/slow-fetch', process.env.NEXT_PUBLIC_HOST).toString(), {
      body: JSON.stringify(await ctx.request.clone().json()),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }

  return initialFrame;
});

export const GET = handleRequest;
export const POST = handleRequest;
