import { SwitchCase } from '@toss/react';
import { useAtomValue } from 'jotai';
import ProfileSetter from './ProfileSetter';
import Waiting from './Waiting';
import { GameStore, SocketStore, UserStore } from '../../../store';
import AccessDenided from './AccessDenided';
import QuizSelectAnswer from './QuizSelectAnswer';
import Header from './Header';

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
        QUIZ: <QuizSelectAnswer />,
        WAITING: <Waiting />,
      }}
      defaultComponent={<Waiting />}
    />
  );
};

export default Phase;
