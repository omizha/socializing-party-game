import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { SwitchCase } from '@toss/react';
import { Tabs, TabsProps } from 'antd';
import { css } from '@emotion/react';
import Home from './Home';
import Buy from './Buy';
import Sell from './Sell';

const navItem = ['홈', '사기', '팔기'] as const;
type NavName = (typeof navItem)[number];

const items: TabsProps['items'] = [
  {
    children: <></>,
    key: '홈',
    label: '홈',
  },
  {
    children: <></>,
    key: '사기',
    label: '사기',
  },
  {
    children: <></>,
    key: '팔기',
    label: '팔기',
  },
];

const Stock = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickTab = useCallback(
    (key: string) => {
      switch (key) {
        case '홈':
          setSearchParams({ page: '홈' });
          break;
        case '사기':
          setSearchParams({ page: '사기' });
          break;
        case '팔기':
          setSearchParams({ page: '팔기' });
          break;
        default:
          setSearchParams({ page: '홈' });
          break;
      }
    },
    [setSearchParams],
  );

  return (
    <>
      <Container>
        {/* <Header title={searchParams.get('page') ?? ''} /> */}
        <div
          css={css`
            padding: 0 16px;
            background-color: #ffffff;
          `}
        >
          <Tabs
            size="large"
            defaultActiveKey={searchParams.get('page') ?? '홈'}
            items={items}
            onChange={onClickTab}
            tabBarStyle={{
              margin: '0 0 0 0',
            }}
          />
        </div>
        <ContentContainer>
          <SwitchCase
            value={searchParams.get('page') ?? '홈'}
            caseBy={{
              사기: <Buy />,
              팔기: <Sell />,
              홈: <Home />,
            }}
            defaultComponent={<Home />}
          />
        </ContentContainer>
      </Container>
      {/* <BottomNav /> */}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding: 12px;
`;

export default Stock;
