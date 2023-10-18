import React from 'react';
import { useAtomValue } from 'jotai';
import { commaizeNumber } from '@toss/utils';
import { getDateDistance } from '@toss/date';
import { Query } from '../../../../hook';
import { UserStore } from '../../../../store';
import Box from '../../../../component-presentation/Box';
import prependZero from '../../../../service/prependZero';

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
      <Box title="잔액" value={`${commaizeNumber(user.money)}원`} />
      <Box title="주식 가치" value={`${commaizeNumber(allSellPrice)}원`} />
      <Box title="모두 팔고 난 뒤의 금액" value={`${commaizeNumber(user.money + allSellPrice)}원`} />
      <Box
        title="모두 팔고 난 뒤의 순이익"
        value={`${(((user.money + allSellPrice) / 1000000) * 100 - 100).toFixed(2)}%`}
      />
      <Box
        title="진행 시간"
        value={`${prependZero(getDateDistance(game.startedTime, new Date()).minutes, 2)}:${prependZero(
          getDateDistance(game.startedTime, new Date()).seconds,
          2,
        )}`}
      />
    </>
  );
};

export default Home;
