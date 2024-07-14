import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Story time!',
    },
    {
      action: 'link',
      label: 'Link to Google',
      target: 'https://www.google.com',
    },
    {
      action: 'post_redirect',
      label: 'Redirect to pictures',
    },
  ],
  image: {
    aspectRatio: '1:1',
    src: `http://static.palete.me/pinkwave/teaser.png`,
  },
  input: {
    text: 'Tell me a boat story',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
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
