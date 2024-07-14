import { Metadata } from 'next';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const metadata: Metadata = {
  openGraph: {
    images: 'https://static.palete.me/pinkwave/teaser.png',
  },
  other: {
    description: 'This is a frames.js starter template',
  },
  title: 'About',
};

const handleRequest = (request: Request) => {
  return new ImageResponse(
    <img src="https://static.palete.me/pinkwave/teaser.png" width="100%" height="100%" alt="img" />,
    {
      height: 1200,
      width: 1200,
    },
  );
};

export const GET = handleRequest;
export const POST = handleRequest;
