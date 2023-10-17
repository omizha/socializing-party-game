import { objectEntries } from '@toss/utils';
import { Query } from '../..';

/**
 * 모두 팔았을 때 가격
 */
const useAllSellPrice = (nickname: string) => {
  const { companiesPrice } = Query.Game.useGame();
  const { user } = Query.useUser(nickname);

  if (!companiesPrice || !user) {
    return { allSellPrice: 0 };
  }

  const allSellPrice = objectEntries(user.inventory).reduce((price, [company, count]) => {
    return price + companiesPrice[company] * count;
  }, 0);

  return { allSellPrice };
};

export default useAllSellPrice;
