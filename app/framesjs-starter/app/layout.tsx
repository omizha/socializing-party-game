import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  description: '...',
  // without a title, warpcast won't validate your frame
  title: 'frames.js starter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
