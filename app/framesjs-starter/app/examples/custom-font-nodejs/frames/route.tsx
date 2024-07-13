/* eslint-disable react/jsx-key */
import { frames } from './frames';

export const runtime = 'nodejs';

const handler = frames(async (ctx) => {
  return {
    image: (
      <span tw="flex flex-col">
        <div>Node.js Example</div>
        <div>Per-route custom fonts</div>
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
