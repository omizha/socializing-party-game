import { objectEntries } from '@toss/utils';
import { useAtomValue } from 'jotai';
import Box from '../../../../component-presentation/Box';
import { Query } from '../../../../hook';
import { UserStore } from '../../../../store';

const Buy = () => {
  const nickname = useAtomValue(UserStore.nickname);

  const { data: game, companiesPrice } = Query.Game.useGame();
  const { mutateAsync: buyStock } = Query.Game.useBuyStock();

  if (!game) {
    return <>불러오는 중</>;
  }

  const onClickBuy = (company: string) => {
    buyStock({ amount: 1, company, nickname, unitPrice: companiesPrice[company] });
  };

  return (
    <>
      {objectEntries(game.remainingStocks).map(([company, count]) => {
        return (
          <Box
            key={company}
            title={`${count}장 남음`}
            value={company}
            rightComponent={
              <button
                onClick={() => {
                  onClickBuy(company);
                }}
              >
                사기
              </button>
            }
          />
        );
      })}
    </>
  );
};

export default Buy;
