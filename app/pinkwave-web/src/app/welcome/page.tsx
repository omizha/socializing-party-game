import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'post',
      label: '🎀 Join the PinkWave 🎀',
    },
  ],
  image: {
    aspectRatio: '1:1',
    src: `http://static.palete.me/pinkwave/teaser.png`,
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/welcome`,
});

export const metadata: Metadata = {
  description: 'LFG',
  openGraph: {
    description: 'LFG',
    images: [`http://static.palete.me/pinkwave/teaser.png`],
    title: 'pinkwave',
  },
  other: {
    ...frameMetadata,
  },
  title: 'pinkwave',
};

export default function Page() {
  return (
    <>
      <h1>WELCOME TO PINKWAVE</h1>
    </>
  );
}
