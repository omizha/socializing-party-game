import React from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { SwitchCase } from '@toss/react';
import BottomNav from './BottomNav';
import Header from '../Header';
import Home from './Home';

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
              사기: <div>사기</div>,
              팔기: <div>팔기</div>,
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
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding: 12px;
`;

export default Stock;
