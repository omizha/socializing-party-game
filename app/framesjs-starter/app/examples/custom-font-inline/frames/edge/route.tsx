/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { frames } from '../frames';

// without this line, this type of importing fonts doesn't work for some reason
export const runtime = 'edge';

const interRegularFont = fetch(new URL('/public/Inter-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer());
const interBoldFont = fetch(new URL('/public/Inter-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer());
const firaScriptFont = fetch(new URL('/public/FiraCodeiScript-Regular.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);

const handleRequest = frames(async (ctx) => {
  const [interRegularFontData, interBoldFontData, firaScriptFontData] = await Promise.all([
    interRegularFont,
    interBoldFont,
    firaScriptFont,
  ]);
  return {
    buttons: [
      <Button action="post" target="/nodejs">
        Node.js
      </Button>,
    ],
    image: (
      <span tw="flex flex-col">
        <div>Edge functions</div>
        <div>Per-route fonts</div>
        <div style={{ fontWeight: 400, marginTop: 40 }}>Regular Inter Font</div>
        <div style={{ fontWeight: 700, marginTop: 40 }}>Bold Inter Font</div>
        <div
          style={{
            fontFamily: "'Fira Code', monospace",
            marginTop: 40,
          }}
        >
          Fira
        </div>
      </span>
    ),
    imageOptions: {
      fonts: [
        {
          data: interRegularFontData,
          name: 'Inter',
          weight: 400,
        },
        {
          data: interBoldFontData,
          name: 'Inter',
          weight: 700,
        },
        {
          data: firaScriptFontData,
          name: 'Fira Code',
          weight: 700,
        },
      ],
    },
  };
});

export const POST = handleRequest;
export const GET = handleRequest;
