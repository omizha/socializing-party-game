import type { Metadata } from 'next';
import { fetchMetadata } from 'frames.js/next';
import { appURL } from '../../utils';
import { DebugLink } from '../../components/DebugLink';

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      ...(await fetchMetadata(new URL('/examples/user-data/frames', appURL()))),
    },
    title: 'Frames.js User Data example',
  };
}

export default async function Home() {
  return (
    <div>
      Frames.js User Data example <DebugLink />
    </div>
  );
}
