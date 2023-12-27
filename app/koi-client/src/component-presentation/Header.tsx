import { css } from '@linaria/core';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';

interface Props {
  title?: string;
}

const Header = ({ title }: Props) => {
  return (
    <div
      className={css`
        min-height: 64px;
        max-height: 64px;
        background-color: #ccc;
        padding: 12px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
      `}
    >
      <Avatar size="large" icon={<UserOutlined />} />
      <div>{title}</div>
      <Avatar size="large" style={{ visibility: 'hidden' }} />
    </div>
  );
};

export default Header;
