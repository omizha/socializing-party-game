import type { Metadata } from 'next';
import { fetchMetadata } from 'frames.js/next';
import { appURL } from '../../utils';
import { DebugLink } from '../../components/DebugLink';

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      ...(await fetchMetadata(new URL('/examples/custom-font-nodejs/frames', appURL()))),
    },
    title: 'Frames.js Custom font Example',
  };
}

export default async function Home() {
  return (
    <div>
      Frames.js Custom font example <DebugLink />
    </div>
  );
}
