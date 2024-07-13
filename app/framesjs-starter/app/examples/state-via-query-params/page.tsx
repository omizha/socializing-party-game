import type { Metadata } from 'next';
import { fetchMetadata } from 'frames.js/next';
import { appURL } from '../../utils';
import { DebugLink } from '../../components/DebugLink';

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      ...(await fetchMetadata(new URL('/examples/state-via-query-params/frames', appURL()))),
    },
    title: 'Frames.js State via Query params example',
  };
}

export default async function Home() {
  return (
    <div>
      Frames.js State via Query params example <DebugLink />
    </div>
  );
}
