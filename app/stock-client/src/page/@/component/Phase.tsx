import { SwitchCase } from '@toss/react';
import { useAtomValue } from 'jotai';
import ProfileSetter from './ProfileSetter';
import Waiting from './Waiting';
import { UserStore } from '../../../store';
import Header from './Header';
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
          CROWDING: isEntry ? (
            <Waiting HeaderComponent={<Header title={nickname} hasQuitButton />} />
          ) : (
            <ProfileSetter />
          ),
          PLAYING: <Stock />,
          WAITING: <Waiting HeaderComponent={<Header title={nickname} />} />,
        }}
        defaultComponent={<Waiting HeaderComponent={<Header title={nickname} />} />}
      />
    </>
  );
};

export default Phase;
