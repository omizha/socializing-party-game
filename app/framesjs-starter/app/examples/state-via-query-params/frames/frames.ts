import { createFrames } from 'frames.js/next';
import { appURL } from '../../../utils';

type State = {
  count: number;
};

export const frames = createFrames<State>({
  basePath: '/examples/state-via-query-params/frames',
  baseUrl: appURL(),
  debug: process.env.NODE_ENV === 'development',
  initialState: {
    count: 0,
  },
});