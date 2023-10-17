import React from 'react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { commaizeNumber } from '@toss/utils';
import { Query } from '../../../../hook';
import { UserStore } from '../../../../store';

const Home = () => {
  const nickname = useAtomValue(UserStore.nickname);

  const { data: game } = Query.Game.useGame();
  const { user } = Query.useUser(nickname);
  const { allSellPrice } = Query.Composite.useAllSellPrice(nickname);

  if (!user || !game) {
    return <div>불러오는 중.</div>;
  }

  return (
    <>
      <Container>
        <ContainerTitle>잔액</ContainerTitle>
        <ContainerBolder>{commaizeNumber(user.money)}원</ContainerBolder>
      </Container>
      <Container>
        <ContainerTitle>순이익</ContainerTitle>
        <ContainerBolder>{((allSellPrice / user.money) * 100).toFixed(2)}%</ContainerBolder>
      </Container>
      <Container>
        <ContainerTitle>팔고 난 뒤의 금액</ContainerTitle>
        <ContainerBolder>{commaizeNumber(user.money + allSellPrice)}원</ContainerBolder>
      </Container>
    </>
  );
};

const H2 = styled.h2``;

const H4 = styled.h4``;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 8px;
  overflow: hidden;

  margin-bottom: 12px;
`;

const ContainerTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const ContainerBolder = styled.div`
  font-size: 18px;
  font-weight: bolder;
  margin-bottom: 8px;
`;

export default Home;
