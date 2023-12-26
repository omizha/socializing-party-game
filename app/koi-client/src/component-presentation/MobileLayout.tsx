import React from 'react';
import { css } from '@linaria/core';

interface Props {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: Props) => {
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
      `}
    >
      <div
        className={css`
          width: 100%;
          max-width: 360px;
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
  );
};

export default MobileLayout;
