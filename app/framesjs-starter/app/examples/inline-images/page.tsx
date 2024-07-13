import type { Metadata } from 'next';
import { fetchMetadata } from 'frames.js/next';
import { appURL } from '../../utils';
import { DebugLink } from '../../components/DebugLink';

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      ...(await fetchMetadata(new URL('/examples/inline-images/frames', appURL()))),
    },
    title: 'Inline images Frames.js example',
  };
}

export default async function Home() {
  return (
    <div>
      Basic Frames.js example. <DebugLink />
    </div>
  );
}
