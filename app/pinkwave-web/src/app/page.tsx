import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'link',
      label: '🎀 Preview PinkWave 🎀',
      target: 'https://maemesoft.notion.site/PinkWave-Project-2222780bdf6c4af6b0d24945dc04de1c',
    },
  ],
  image: {
    aspectRatio: '1:1',
    src: `http://static.palete.me/pinkwave/teaser.png`,
  },
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
      <h1>pinkwave</h1>
    </>
  );
}
