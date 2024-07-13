import type { Metadata } from 'next';
import { fetchMetadata } from 'frames.js/next';
import { appURL } from '../../utils';
import { DebugLink } from '../../components/DebugLink';

export async function generateMetadata(): Promise<Metadata> {
  return {
    description: 'This is a new api example',
    other: {
      ...(await fetchMetadata(new URL('/examples/error-handling/frames', appURL()))),
    },
    title: 'Frames.js Error Message handling example',
  };
}

export default async function Home() {
  return (
    <div>
      Frames.js Error Message handling example. <DebugLink />
    </div>
  );
}
