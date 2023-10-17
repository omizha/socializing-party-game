import React from 'react';
import { objectEntries } from '@toss/utils';
import { useAtomValue } from 'jotai';
import Box from '../../../../component-presentation/Box';
import { UserStore } from '../../../../store';
import { Query } from '../../../../hook';

const Sell = () => {
  const nickname = useAtomValue(UserStore.nickname);

  const { data: game, companiesPrice } = Query.Game.useGame();
  const { user } = Query.useUser(nickname);
  const { mutateAsync: sellStock } = Query.Game.useSellStock();

  if (!user || !game) {
    return <div>불러오는 중.</div>;
  }

  const onClickSell = (company: string) => {
    sellStock({ amount: 1, company, nickname, unitPrice: companiesPrice[company] });
  };

  return (
    <>
      {objectEntries(user.inventory).map(([company, count]) => (
        <Box
          key={company}
          title={`${count}장 소지중`}
          value={company}
          rightComponent={
            <button
              onClick={() => {
                onClickSell(company);
              }}
            >
              팔기
            </button>
          }
        />
      ))}
    </>
  );
};

export default Sell;
