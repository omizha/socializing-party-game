import React from 'react';
import { objectEntries } from '@toss/utils';
import { useAtomValue } from 'jotai';
import { Button, message } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import Box from '../../../../component-presentation/Box';
import { UserStore } from '../../../../store';
import { Query } from '../../../../hook';

const Sell = () => {
  const nickname = useAtomValue(UserStore.nickname);

  const { data: game, companiesPrice, timeIdx } = Query.Game.useGame();
  const { user, isFreezed } = Query.useUser(nickname);
  const { mutateAsync: sellStock, isLoading } = Query.Game.useSellStock();

  const [messageApi, contextHolder] = message.useMessage();

  if (!user || !game) {
    return <div>불러오는 중.</div>;
  }

  const onClickSell = (company: string) => {
    sellStock({ amount: 1, company, nickname, unitPrice: companiesPrice[company] })
      .then(() => {
        messageApi.open({
          content: '주식을 팔았습니다.',
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

  const isDisabled = timeIdx === undefined || timeIdx >= 9 || !game.isTransaction;

  return (
    <>
      {contextHolder}
      {objectEntries(user.inventory).map(([company, count]) =>
        count ? (
          <Box
            key={company}
            title={`${count}주 가지고 있음`}
            value={company}
            rightComponent={
              <Button
                icon={<DollarOutlined />}
                disabled={count === 0 || isDisabled}
                loading={isLoading || isFreezed}
                onClick={() => {
                  onClickSell(company);
                }}
              >
                팔기
              </Button>
            }
          />
        ) : (
          <></>
        ),
      )}
    </>
  );
};

export default Sell;
