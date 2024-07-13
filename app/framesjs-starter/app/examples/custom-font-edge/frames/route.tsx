/* eslint-disable react/jsx-key */
import { frames } from './frames';

// Add this line to the route that will be handling images
export const runtime = 'edge';

const handler = frames(async (ctx) => {
  return {
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
  };
});

export const GET = handler;
export const POST = handler;
