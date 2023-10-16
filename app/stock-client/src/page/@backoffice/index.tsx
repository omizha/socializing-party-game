import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useInterval } from '@toss/react';
import prependZero from '../../service/prependZero';
import Table from './component/Table';
import { POV } from '../../type';
import { Query } from '../../hook';
import UserList from './component/UserList';

// playerLength / 3
// 29 - 10
// 30 - 10
export default function Stock() {
  const { mutateAsync: mutateUpdateGame } = Query.useUpdateGame();
  const { mutateAsync: mutateInitStock } = Query.useInitStock();
  const { mutateAsync: mutateResetGame } = Query.useResetGame();
  const { data: users } = Query.useUsers();
  const { data: game } = Query.useGame();
  console.debug('🚀 ~ file: index.tsx:17 ~ Stock ~ game:', game);

  const startedTime = game?.startedTime ?? new Date();

  const [pov, setPov] = useState<POV>('player');

  // 경과된 시간
  const [elapsedTime, setElapsedTime] = useState<Date>(new Date(new Date().getTime() - startedTime.getTime()));

  useInterval(
    () => {
      setElapsedTime(new Date(new Date().getTime() - startedTime.getTime()));
    },
    {
      delay: 1000,
    },
  );

  return (
    <Container>
      <UserList />
      <Table elapsedTime={elapsedTime} pov={pov} />
      <hr />
      <button
        onClick={() => {
          mutateResetGame();
        }}
      >
        게임 초기화
      </button>
      <button
        onClick={() => {
          mutateInitStock();
        }}
      >
        주식 초기화
      </button>
      <button
        onClick={() => {
          setPov(pov === 'host' ? 'player' : 'host');
        }}
      >
        {pov === 'host' ? '참가자' : '호스트'} 시점
      </button>
      <div>
        시작된 시간 :{' '}
        {startedTime.toLocaleString('ko-KR', {
          hour12: false,
          timeZone: 'Asia/Seoul',
        })}
      </div>
      <div>
        경과된 시간 : {`${prependZero(elapsedTime.getMinutes(), 2)}:${prependZero(elapsedTime.getSeconds(), 2)}`}
      </div>
      <button
        onClick={() => {
          mutateUpdateGame({
            startedTime: new Date(startedTime.getTime() - 60 * 1000),
          });
        }}
      >
        1분 과거로
      </button>
      <button
        onClick={() => {
          mutateUpdateGame({
            startedTime: new Date(startedTime.getTime() - 10 * 1000),
          });
        }}
      >
        10초 과거로
      </button>
      <hr />
      <div>
        {users.map((user) => {
          return <input type="radio" value={user.nickname} name={user.nickname} key={user.nickname} />;
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  // padding: 20px;
`;
