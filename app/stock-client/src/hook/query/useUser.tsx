import { getDateDistance } from '@toss/date';
import { Query } from '..';

const useUser = (nickname: string) => {
  const { data: game } = Query.Game.useGame();
  const { data } = Query.useUserList();
  const user = data?.find((user) => user.nickname === nickname);

  if (!user) {
    return { user: undefined };
  }

  const { minutes, seconds } = getDateDistance(user.lastActivityTime, new Date());
  const isFreezed = minutes === 0 && seconds < (game?.fluctuationsInterval ?? 5);

  return { isFreezed, user };
};

export default useUser;
