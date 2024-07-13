import { createFrames } from 'frames.js/next';

type State = {
  counter: number;
};

export const frames = createFrames<State>({
  basePath: '/frames',
  debug: process.env.NODE_ENV === 'development',
  initialState: { counter: 0 },
});
