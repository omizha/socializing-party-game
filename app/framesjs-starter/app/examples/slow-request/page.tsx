import type { Metadata } from 'next';
import { fetchMetadata } from 'frames.js/next';
import { appURL } from '../../utils';
import { DebugLink } from '../../components/DebugLink';

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      ...(await fetchMetadata(new URL('/examples/slow-request/frames', appURL()))),
    },
    title: 'Frames.js Slow Request Example',
  };
}

export default async function Home() {
  return (
    <div>
      Frames.js Slow Request example <DebugLink />
    </div>
  );
}
