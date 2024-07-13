import type { Metadata } from 'next';
import { fetchMetadata } from 'frames.js/next';
import { appURL } from '../../utils';
import { DebugLink } from '../../components/DebugLink';

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      ...(await fetchMetadata(new URL('/examples/multi-protocol/frames', appURL()))),
    },
    title: 'Frames.js Multi protocol Example',
  };
}

export default async function Home() {
  return (
    <div>
      Frames.js Multi protocol example <DebugLink />
    </div>
  );
}
