import type { Metadata } from 'next';
import { fetchMetadata } from 'frames.js/next';
import { appURL } from '../../utils';
import { DebugLink } from '../../components/DebugLink';

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      ...(await fetchMetadata(new URL('/examples/multi-page/frames', appURL()))),
    },
    title: 'Frames.js Multi Page Example',
  };
}

export default async function Home() {
  return (
    <div>
      Frames.js Multi Page example <DebugLink />
    </div>
  );
}
