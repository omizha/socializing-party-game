import type { Metadata } from 'next';
import { fetchMetadata } from 'frames.js/next';
import { appURL } from '../../utils';
import { DebugLink } from '../../components/DebugLink';

export async function generateMetadata(): Promise<Metadata> {
  return {
    description: 'This is a new api example',
    other: {
      ...(await fetchMetadata(new URL('/examples/dynamic-routes/frames', appURL()))),
    },
    title: 'Frames.js dynamic routes example',
  };
}

export default async function Home() {
  return (
    <div>
      Frames.js dynamic routes example. <DebugLink />
    </div>
  );
}
