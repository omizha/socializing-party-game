import { SwitchCase } from '@toss/react';
import { useAtomValue } from 'jotai';
import ProfileSetter from './ProfileSetter';
import Waiting from './Waiting';
import { UserStore } from '../../../store';
import { Query } from '../../../hook';
import AccessDenided from './AccessDenided';
import Stock from './Stock';

const Phase = () => {
  const { data: game } = Query.Game.useGame();
  const { data: users } = Query.useUserList();
  const gamePhase = game?.gamePhase ?? 'WAITING';

  const nickname = useAtomValue(UserStore.nickname);

  const isEntry = users?.some((user) => user.nickname === nickname);

  if (!isEntry && gamePhase !== 'CROWDING') {
    return <AccessDenided />;
  }

  return (
    <>
      <SwitchCase
        value={gamePhase}
        caseBy={{
          CROWDING: isEntry ? <Waiting /> : <ProfileSetter />,
          PLAYING: <Stock />,
          WAITING: <Waiting />,
        }}
        defaultComponent={<Waiting />}
      />
    </>
  );
};

export default Phase;
