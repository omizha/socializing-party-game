import { transaction } from 'frames.js/core';
import { frames } from '../frames';

export const POST = frames(async (ctx) => {
  if (!ctx?.message) {
    throw new Error('Invalid frame message');
  }

  return transaction({
    chainId: 'eip155:10', // OP Mainnet 10
    method: 'eth_signTypedData_v4',
    params: {
      domain: {
        chainId: 10,
      },
      message: {
        contents: 'Hello, Bob!',
        from: {
          name: 'Cow',
          wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        },
        to: {
          name: 'Bob',
          wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        },
      },
      primaryType: 'Mail',
      types: {
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person' },
          { name: 'contents', type: 'string' },
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' },
        ],
      },
    },
  });
});
