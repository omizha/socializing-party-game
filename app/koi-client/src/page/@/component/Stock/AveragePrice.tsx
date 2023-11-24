import { useAtomValue } from 'jotai';
import { commaizeNumber, objectKeys } from '@toss/utils';
import { UserStore } from '../../../../store';
import { Query } from '../../../../hook';
import Box from '../../../../component-presentation/Box';

const AveragePrice = () => {
  const nickname = useAtomValue(UserStore.nickname);
  const { data: log } = Query.useLog(nickname);
  const { data: game } = Query.Game.useGame();

  const priceInfo = log
    .filter((v) => v.action === 'BUY')
    .reduce(
      (reducer, v) => {
        if (!reducer[v.company]) {
          reducer[v.company] = {
            count: 0,
            sum: 0,
          };
        }
        reducer[v.company].count += 1;
        reducer[v.company].sum += v.price;
        return reducer;
      },
      {} as Record<
        string,
        {
          sum: number;
          count: number;
        }
      >,
    );
  const companyList = objectKeys(priceInfo);

  if (!game) {
    return <></>;
  }

  return (
    <>
      {companyList.map((company) => {
        const average = priceInfo[company].sum / priceInfo[company].count;
        return (
          <Box
            title={`${priceInfo[company].count}회`}
            value={company}
            rightComponent={<>{commaizeNumber(average)}원</>}
            key={company}
          />
        );
      })}
    </>
  );
};

export default History;
