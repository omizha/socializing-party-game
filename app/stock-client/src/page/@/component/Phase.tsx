import { SwitchCase } from '@toss/react';
import { useAtomValue } from 'jotai';
import ProfileSetter from './ProfileSetter';
import Waiting from './Waiting';
import { GameStore, SocketStore, UserStore } from '../../../store';
import AccessDenided from './AccessDenided';
import Header from './Header';
import Quiz from './Quiz';

const Phase = () => {
  const gamePhase = useAtomValue(GameStore.gamePhase);
  console.debug('🚀 ~ file: Phase.tsx:12 ~ Phase ~ gamePhase:', gamePhase);

  const nickname = useAtomValue(UserStore.nickname);
  const users = useAtomValue(SocketStore.userList);
  console.debug('🚀 ~ file: Phase.tsx:14 ~ Phase ~ users:', users);
  const isEntry = users?.find((user) => user.nickname === nickname)?.isEntry ?? false;
  console.debug('🚀 ~ file: Phase.tsx:16 ~ Phase ~ isEntry:', isEntry);

  if (!nickname) {
    return <ProfileSetter />;
  }

  if (!isEntry && gamePhase !== 'CROWDING') {
    return <AccessDenided />;
  }

  return (
    <SwitchCase
      value={gamePhase}
      caseBy={{
        CROWDING: isEntry ? <Waiting HeaderComponent={<Header hasQuitButton />} /> : <ProfileSetter />,
        QUIZ: <Quiz />,
        WAITING: <Waiting HeaderComponent={<Header title={nickname} />} />,
      }}
      defaultComponent={<Waiting HeaderComponent={<Header title={nickname} />} />}
    />
  );
};

export default Phase;
