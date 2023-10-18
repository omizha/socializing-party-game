import { objectEntries } from '@toss/utils';
import { useCallback } from 'react';
import { Query } from '../..';

/**
 * 모두 팔았을 때 가격
 */
const useAllSellPrice = (nickname: string) => {
  const { companiesPrice } = Query.Game.useGame();
  const { data: users } = Query.useUserList();

  const allSellPriceCallback = useCallback(
    (nickname: string) => {
      const selectedUser = users.find((selUser) => selUser.nickname === nickname);

      if (!selectedUser || !companiesPrice) {
        return 0;
      }

      return objectEntries(selectedUser.inventory).reduce((price, [company, count]) => {
        return price + companiesPrice[company] * count;
      }, 0);
    },
    [companiesPrice, users],
  );

  const allSellPrice = allSellPriceCallback(nickname);

  const allUserSellPriceDesc = useCallback(() => {
    const AllSellPriceByUser = [] as Array<{ nickname: string; allSellPrice: number }>;
    for (const user of users) {
      AllSellPriceByUser.push({
        allSellPrice: allSellPriceCallback(user.nickname),
        nickname: user.nickname,
      });
    }
    return AllSellPriceByUser.sort((a, b) => b.allSellPrice - a.allSellPrice);
  }, [allSellPriceCallback, users]);

  return { allSellPrice, allUserSellPriceDesc };
};

export default useAllSellPrice;
