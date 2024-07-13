import Link from 'next/link';

const examples = [
  {
    path: '/examples/basic',
    title: 'Basic',
  },
  {
    path: '/examples/cache-control',
    title: 'Cache Control',
  },
  {
    path: '/examples/cast-actions',
    title: 'Cast Actions',
  },
  {
    path: '/examples/custom-hub',
    title: 'Custom Farcaster Hub',
  },
  {
    path: '/examples/custom-font-nodejs',
    title: 'Custom Font (nodejs)',
  },
  {
    path: '/examples/custom-middleware',
    title: 'Custom Middleware',
  },
  {
    path: '/examples/error-handling',
    title: 'Error Message handling',
  },
  {
    path: '/examples/images-worker',
    title: 'Images Worker',
  },
  {
    path: '/examples/images-worker-custom',
    title: 'Images Worker (Custom)',
  },
  {
    path: '/examples/mint-button',
    title: 'Mint Button',
  },
  {
    path: '/examples/multi-page',
    title: 'Multi Page',
  },
  {
    path: '/examples/multi-protocol',
    title: 'Multi Protocol',
  },
  {
    path: '/examples/only-followers-can-mint',
    title: 'Only Followers Can Mint',
  },
  {
    path: '/examples/post-redirect',
    title: 'Post Redirect',
  },
  {
    path: '/examples/slow-request',
    title: 'Slow Request',
  },
  {
    path: '/examples/state',
    title: 'State',
  },
  {
    path: '/examples/state-signing',
    title: 'State Signing',
  },
  {
    path: '/examples/state-via-query-params',
    title: 'State via Query Params',
  },
  {
    path: '/examples/transactions',
    title: 'Transactions',
  },
  {
    path: '/examples/user-data',
    title: 'User Data',
  },
];

export default function ExamplesIndexPage() {
  return (
    <div className="p-2 flex flex-col gap-2">
      <b>Frames.js examples</b>
      <ul>
        {examples.map((example) => (
          <li key={example.path}>
            <Link className="underline" href={example.path}>
              {example.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
