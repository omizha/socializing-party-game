import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useInterval } from '@toss/react';
import { RadioGroup } from '@headlessui/react';
import { css } from '@emotion/react';
import { objectKeys } from '@toss/utils';
import { getDateDistance } from '@toss/date';
import { getRandomCompanyNames } from 'shared~config/dist/stock';
import prependZero from '../../service/prependZero';
import Table from './component/Table';
import { POV } from '../../type';
import { Query } from '../../hook';
import UserList from './component/UserList';

// playerLength / 3
// 29 - 10
// 30 - 10
export default function Stock() {
  const { mutateAsync: mutateUpdateGame } = Query.Game.useUpdateGame();
  const { mutateAsync: mutateInitStock } = Query.Game.useInitStock();
  const { mutateAsync: mutateResetGame } = Query.Game.useResetGame();
  const { mutateAsync: mutateBuyStock } = Query.Game.useBuyStock();
  const { mutateAsync: mutateSellStock } = Query.Game.useSellStock();
  const { mutateAsync: mutateFinishStock } = Query.Game.useFinishStock();
  const { data: users } = Query.useUserList();
  const { data: game } = Query.Game.useGame();

  const companies = game?.companies ?? {};
  const companyNames = objectKeys(companies).length > 0 ? objectKeys(companies) : getRandomCompanyNames();
  const startedTime = game?.startedTime ?? new Date();
  const currentPriceIdx = Math.floor(getDateDistance(startedTime, new Date()).minutes / 5);

  const [selectedCompany, setSelectedCompany] = useState<string>(companyNames[0]);
  const [selectedUser, setSelectedUser] = useState<string>(users?.[0]?.nickname ?? '');
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
          mutateUpdateGame({
            gamePhase: 'CROWDING',
          });
        }}
      >
        CRAWDING
      </button>
      <button
        onClick={() => {
          mutateUpdateGame({
            gamePhase: 'WAITING',
          });
        }}
      >
        WAITING
      </button>
      <button
        onClick={() => {
          mutateUpdateGame({
            gamePhase: 'PLAYING',
          });
        }}
      >
        PLAYING
      </button>
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
          mutateUpdateGame({
            isTransaction: true,
            startedTime: new Date(),
          });
        }}
      >
        주식 거래 활성화
      </button>
      <button
        onClick={() => {
          mutateFinishStock();
        }}
      >
        주식 종료 및 정상
      </button>
      <button
        onClick={() => {
          mutateUpdateGame({
            isTransaction: !game?.isTransaction,
          });
        }}
      >
        주식 토글 (현재상태:{game?.isTransaction ? 'true' : 'false'})
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
      <RadioGroup
        value={selectedUser}
        onChange={(value) => {
          setSelectedUser(value);
        }}
      >
        <RadioGroup.Label>유저 선택</RadioGroup.Label>
        <div
          css={css`
            display: flex;
            gap: 8px;
          `}
        >
          {users.map((user) => (
            <RadioGroup.Option key={user.nickname} value={user.nickname}>
              {({ checked }) => <span style={{ color: checked ? 'red' : 'black' }}>{user.nickname}</span>}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <RadioGroup
        value={selectedCompany}
        onChange={(value) => {
          setSelectedCompany(value);
        }}
      >
        <RadioGroup.Label>회사 선택</RadioGroup.Label>
        <div
          css={css`
            display: flex;
            gap: 8px;
          `}
        >
          {companyNames.map((company) => (
            <RadioGroup.Option key={company} value={company}>
              {({ checked }) => <span style={{ color: checked ? 'red' : 'black' }}>{company}</span>}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <button
        onClick={() => {
          mutateBuyStock({
            amount: 1,
            company: selectedCompany,
            nickname: selectedUser,
            unitPrice: game?.companies[selectedCompany][currentPriceIdx].가격 ?? -1,
          });
        }}
      >
        매수
      </button>
      <button
        onClick={() => {
          mutateSellStock({
            amount: 1,
            company: selectedCompany,
            nickname: selectedUser,
            unitPrice: game?.companies[selectedCompany][currentPriceIdx].가격 ?? -1,
          });
        }}
      >
        매도
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
