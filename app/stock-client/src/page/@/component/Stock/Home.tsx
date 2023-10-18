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
  const { data: users } = Query.useUserList();
  const { user } = Query.useUser(nickname);
  const { allSellPrice, allUserSellPriceDesc } = Query.Composite.useAllSellPrice(nickname);

  if (!user || !game) {
    return <div>불러오는 중.</div>;
  }

  const getProfitRatio = (v: number) => ((v / 1000000) * 100 - 100).toFixed(2);

  const allProfitDesc = allUserSellPriceDesc()
    .map(({ nickname, allSellPrice }) => {
      const user = users.find((v) => v.nickname === nickname);
      if (!user) {
        return {
          nickname,
          profit: 0,
        };
      }

      return {
        nickname,
        profit: allSellPrice + user.money,
      };
    })
    .sort((a, b) => b.profit - a.profit);

  return (
    <>
      <Box
        title="잔액"
        value={`${commaizeNumber(user.money)}원`}
        rightComponent={<>{users.sort((a, b) => b.money - a.money).findIndex((v) => v.nickname === nickname) + 1}위</>}
      />
      <Box
        title="주식 가치"
        value={`${commaizeNumber(allSellPrice)}원`}
        rightComponent={<>{allUserSellPriceDesc().findIndex((v) => v.nickname === nickname) + 1}위</>}
      />
      <Box
        title="모두 팔고 난 뒤의 금액"
        value={`${commaizeNumber(user.money + allSellPrice)}원`}
        rightComponent={<>{allProfitDesc.findIndex((v) => v.nickname === nickname) + 1}위</>}
      />
      <Box
        title="모두 팔고 난 뒤의 순이익"
        value={`${getProfitRatio(user.money + allSellPrice)}%`}
        rightComponent={<>{allProfitDesc.findIndex((v) => v.nickname === nickname) + 1}위</>}
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
