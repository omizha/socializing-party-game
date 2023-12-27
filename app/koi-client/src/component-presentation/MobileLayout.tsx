import React from 'react';
import { css } from '@linaria/core';
import { useMediaQuery } from 'react-responsive';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: Props) => {
  const isDesktop = useMediaQuery({ query: `(min-width: 800px)` });

  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 400px;
          height: 100%;
        `}
        style={{
          maxWidth: isDesktop ? '400px' : '100%',
        }}
      >
        <Header />
        <div
          className={css`
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 20px;
            background-color: #bbb;
            display: flex;
            flex-direction: column;
            justify-content: center;
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
