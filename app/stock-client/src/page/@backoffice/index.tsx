import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useInterval } from '@toss/react';
import prependZero from '../../service/prependZero';
import Table from './component/Table';
import { POV } from '../../type';
import { Query } from '../../hook';

// playerLength / 3
// 29 - 10
// 30 - 10
export default function Stock() {
  const [pov, setPov] = useState<POV>('player');

  const [startedTime, setStartedTime] = useState<Date>(new Date());

  // 경과된 시간
  const [elapsedTime, setElapsedTime] = useState<Date>(new Date(new Date().getTime() - startedTime.getTime()));

  const { data: users } = Query.useUsers();

  const { mutateAsync: mutateRemoveUser } = Query.useRemoveUser();

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
      <table>
        <thead>
          <tr>
            <td>
              <div>참가자 {users?.length}명</div>
            </td>
            {users?.map((user) => (
              <td key={user.nickname}>
                <button
                  onClick={() => {
                    mutateRemoveUser(user.nickname);
                  }}
                >
                  {user.nickname}
                </button>
              </td>
            ))}
          </tr>
        </thead>
      </table>
      <Table elapsedTime={elapsedTime} pov={pov} />
      <hr />
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
          setStartedTime((prev) => new Date(prev.getTime() - 60 * 1000));
        }}
      >
        1분 과거로
      </button>
      <button
        onClick={() => {
          setStartedTime((prev) => new Date(prev.getTime() - 10 * 1000));
        }}
      >
        10초 과거로
      </button>
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
