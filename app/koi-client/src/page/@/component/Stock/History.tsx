import { useAtomValue } from 'jotai';
import { getDateDistance } from '@toss/date';
import { commaizeNumber } from '@toss/utils';
import { css } from '@emotion/react';
import { UserStore } from '../../../../store';
import { Query } from '../../../../hook';
import Box from '../../../../component-presentation/Box';
import prependZero from '../../../../service/prependZero';
import { colorDown, colorUp } from '../../../../config/color';

const History = () => {
  const nickname = useAtomValue(UserStore.nickname);
  const { data: log } = Query.useLog(nickname);
  const { data: game } = Query.Game.useGame();

  if (!game) {
    return <></>;
  }

  return (
    <>
      {log.map((v) => {
        const { minutes, seconds } = getDateDistance(game.startedTime, v.date);
        const date = `${prependZero(minutes, 2)}:${prependZero(seconds, 2)}`;
        return (
          <Box
            title={date}
            value={v.company}
            rightComponent={
              <div
                css={css`
                  font-size: 18px;
                  color: ${v.action === 'BUY' ? colorUp : colorDown};
                `}
              >
                {commaizeNumber(v.price)}원에 {v.action === 'BUY' ? '샀음' : '팔음'}
              </div>
            }
            key={date}
          />
        );
      })}
      {/* <Box title="" value="" /> */}
    </>
  );
};

export default History;
