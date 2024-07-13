import type { Metadata } from 'next';
import { fetchMetadata } from 'frames.js/next';
import { appURL } from '../../utils';
import { DebugLink } from '../../components/DebugLink';

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      ...(await fetchMetadata(new URL('/examples/images-worker/frames', appURL()))),
    },
    title: 'Frames.js Image Worker Example',
  };
}

export default async function Home() {
  return (
    <div>
      Frames.js Image Worker example <DebugLink />
    </div>
  );
}
