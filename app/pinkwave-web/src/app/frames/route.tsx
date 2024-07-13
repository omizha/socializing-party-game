import { createFrames, Button } from 'frames.js/next';

const frames = createFrames({
  basePath: '/frames',
});
const handleRequest = frames(async () => {
  return {
    buttons: [
      // eslint-disable-next-line react/jsx-key
      <Button action="link" target="https://maemesoft.notion.site/PinkWave-Project-2222780bdf6c4af6b0d24945dc04de1c">
        Preview
      </Button>,
    ],
    image: 'https://static.palete.me/pinkwave/teaser.png',
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
