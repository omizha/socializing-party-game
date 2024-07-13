import { NextRequest } from 'next/server';
import { ActionMetadata } from 'frames.js';
import { appURL } from '../../../../../utils';
import { frames } from '../../frames';

export const GET = async (req: NextRequest) => {
  const actionMetadata: ActionMetadata = {
    aboutUrl: `${appURL()}/examples/cast-actions`,
    action: {
      type: 'post',
    },
    description: 'Check the FID of the caster.',
    icon: 'number',
    name: 'Check FID',
  };

  return Response.json(actionMetadata);
};

export const POST = frames(async (ctx) => {
  return Response.json({
    message: `The user's FID is ${ctx.message?.castId?.fid}`,
  });
});
