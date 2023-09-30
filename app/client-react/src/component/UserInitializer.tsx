import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { Query, Socket } from '../hook';
import { UserStore } from '../store';
import { socket } from '../library/socket-io';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UserInitializer = ({ children }: Props) => {
  const isConnected = socket.connected;
  Socket.useOnGame({});
  Socket.useOnCurrentUserList({});

  Query.useGame();
  Query.useUsers();

  const nickname = useAtomValue(UserStore.nickname);
  const profilePictureUrl = useAtomValue(UserStore.profilePictureUrl);

  const { emitUserProfile } = Socket.useEmitUserProfile();

  useEffect(() => {
    console.debug(
      '🚀 ~ file: UserInitializer.tsx:32 ~ UserInitializer ~ emitUserProfile, isConnected, nickname, profilePictureUrl:',
      { isConnected, nickname, profilePictureUrl },
    );
    if (!isConnected) {
      return;
    }

    if (nickname) {
      emitUserProfile({ nickname, profilePictureUrl });
    }
  }, [emitUserProfile, isConnected, nickname, profilePictureUrl]);

  return <>{children}</>;
};

export default UserInitializer;
