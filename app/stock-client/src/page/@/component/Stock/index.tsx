import React from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { SwitchCase } from '@toss/react';
import BottomNav from './BottomNav';
import Header from '../Header';
import Home from './Home';
import Buy from './Buy';
import Sell from './Sell';

const Stock = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <Container>
        <Header title={searchParams.get('page') ?? ''} />
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
      <BottomNav />
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
