import React, { CSSProperties } from 'react';
import { css } from '@linaria/core';
import { useMediaQuery } from 'react-responsive';

interface Props {
  children?: React.ReactNode;
  HeaderComponent?: React.ReactNode;
  justifyContent?: CSSProperties['justifyContent'];
}

const MobileLayout = ({ children, HeaderComponent, justifyContent }: Props) => {
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
        {HeaderComponent}
        <div
          className={css`
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 20px;
            background-color: #f1f1f1;
            display: flex;
            flex-direction: column;
          `}
          style={{
            justifyContent: justifyContent || 'center',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
