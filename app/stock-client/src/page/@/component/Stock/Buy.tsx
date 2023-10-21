import { objectEntries } from '@toss/utils';
import { useAtomValue } from 'jotai';
import { Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Box from '../../../../component-presentation/Box';
import { Query } from '../../../../hook';
import { UserStore } from '../../../../store';

const Buy = () => {
  const nickname = useAtomValue(UserStore.nickname);

  const { data: game, companiesPrice, timeIdx } = Query.Game.useGame();
  const { mutateAsync: buyStock, isLoading } = Query.Game.useBuyStock();

  const [messageApi, contextHolder] = message.useMessage();

  if (!game) {
    return <>불러오는 중</>;
  }

  const onClickBuy = (company: string) => {
    buyStock({ amount: 1, company, nickname, unitPrice: companiesPrice[company] })
      .then(() => {
        messageApi.open({
          content: '주식을 구매하였습니다.',
          duration: 2,
          type: 'success',
        });
      })
      .catch((reason: Error) => {
        messageApi.open({
          content: `${reason.message}`,
          duration: 2,
          type: 'error',
        });
      });
  };

  const isDisabled = timeIdx === undefined || timeIdx >= 9;

  return (
    <>
      {contextHolder}
      {objectEntries(game.remainingStocks).map(([company, count]) => {
        return (
          <Box
            key={company}
            title={`${count}주 남음`}
            value={company}
            rightComponent={
              <Button
                icon={<ShoppingCartOutlined />}
                disabled={count === 0 || isDisabled}
                loading={isLoading}
                onClick={() => {
                  onClickBuy(company);
                }}
              >
                사기
              </Button>
            }
          />
        );
      })}
    </>
  );
};

export default Buy;
