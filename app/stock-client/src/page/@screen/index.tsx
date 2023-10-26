import styled from '@emotion/styled';
import React from 'react';
import { getDateDistance } from '@toss/date';
import { SwitchCase } from '@toss/react';
import { QRCode } from 'antd';
import Table from './component/Table';
import { Query } from '../../hook';
import prependZero from '../../service/prependZero';

// playerLength / 3
// 29 - 10
// 30 - 10
export default function Screen() {
  const { data: game } = Query.Game.useGame();

  const startedTime = game?.startedTime ?? new Date();
  const gamePhase = game?.gamePhase ?? 'CROWDING';

  const { seconds, minutes } = getDateDistance(startedTime, new Date());

  return (
    <>
      <SwitchCase
        value={gamePhase}
        caseBy={{
          PLAYING: (
            <>
              <TimeBox>
                {prependZero(minutes, 2)}:{prependZero(seconds, 2)}
              </TimeBox>
              <Wrapper>
                <Container>
                  <Table />
                </Container>
              </Wrapper>
            </>
          ),
        }}
        defaultComponent={
          <>
            <TimeBox>QR코드를 스캔하여 입장하세요</TimeBox>
            <Wrapper>
              <Container>
                <QRCode value={window.location.origin} bgColor="#ffffff" size={300} />
              </Container>
            </Wrapper>
          </>
        }
      />
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 180px;
  box-sizing: border-box;
`;

const TimeBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 100px;
  font-size: 48px;
  text-shadow: 2px 2px #8461f8;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  box-shadow: 5px 5px #000000;
  background-color: #000084;
`;
