import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  return new ImageResponse(
    <img src="/teaser.png" alt="img" width="100%" />,
    // <div
    //   style={{
    //     alignItems: 'center',
    //     background: 'white',
    //     color: 'black',
    //     fontSize: 40,
    //     height: '100%',
    //     justifyContent: 'center',
    //     padding: '50px 200px',
    //     textAlign: 'center',
    //     width: '100%',
    //   }}
    // >
    //   TEST FOR PINKWAVE
    // </div>
    {
      height: 600,
      width: 600,
    },
  );
}
