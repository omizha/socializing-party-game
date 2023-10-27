import React from 'react';
import { useAtomValue } from 'jotai';
import { commaizeNumber, objectEntries } from '@toss/utils';
import { getDateDistance } from '@toss/date';
import styled from '@emotion/styled';
import { Query } from '../../../../hook';
import { UserStore } from '../../../../store';
import Box from '../../../../component-presentation/Box';
import prependZero from '../../../../service/prependZero';
import { down as colorDown, up as colorUp } from '../../../../config/color';

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

  const myInfos = objectEntries(game.companies).reduce((reducer, [company, companyInfos]) => {
    companyInfos.forEach((companyInfo, idx) => {
      if (companyInfos[idx].정보.some((name) => name === nickname)) {
        reducer.push({
          company,
          price: companyInfo.가격 - companyInfos[idx - 1].가격,
          timeIdx: idx,
        });
      }
    });

    return reducer;
  }, [] as Array<{ company: string; timeIdx: number; price: number }>);

  return (
    <>
      <H3>홈</H3>
      <Box
        title="진행 시간"
        value={`${prependZero(getDateDistance(game.startedTime, new Date()).minutes, 2)}:${prependZero(
          getDateDistance(game.startedTime, new Date()).seconds,
          2,
        )}`}
      />
      <Box
        title="잔액"
        value={`${commaizeNumber(user.money)}원`}
        rightComponent={
          game.isVisibleRank ? (
            <>{users.sort((a, b) => b.money - a.money).findIndex((v) => v.nickname === nickname) + 1}위</>
          ) : (
            <></>
          )
        }
      />
      <Box
        title="주식 가치"
        value={`${commaizeNumber(allSellPrice)}원`}
        rightComponent={
          game.isVisibleRank ? <>{allUserSellPriceDesc().findIndex((v) => v.nickname === nickname) + 1}위</> : <></>
        }
      />
      <Box
        title="모두 팔고 난 뒤의 금액"
        value={`${commaizeNumber(user.money + allSellPrice)}원`}
        rightComponent={
          game.isVisibleRank ? <>{allProfitDesc.findIndex((v) => v.nickname === nickname) + 1}위</> : <></>
        }
      />
      <Box
        title="모두 팔고 난 뒤의 순이익"
        value={`${getProfitRatio(user.money + allSellPrice)}%`}
        rightComponent={
          game.isVisibleRank ? <>{allProfitDesc.findIndex((v) => v.nickname === nickname) + 1}위</> : <></>
        }
      />
      <br />
      <H3>내가 가진 정보</H3>
      {myInfos.map(({ company, price, timeIdx }) => {
        return (
          <Box
            key={`${company}_${timeIdx}`}
            title={`${company}`}
            value={`${price >= 0 ? '▲' : '▼'}${commaizeNumber(Math.abs(price))}`}
            valueColor={price >= 0 ? colorUp : colorDown}
            rightComponent={<>{prependZero(timeIdx * game.fluctuationsInterval, 2)}:00</>}
          />
        );
      })}
    </>
  );
};

const H3 = styled.h3`
  text-shadow: 2px 2px #8461f8;
`;

export default Home;
