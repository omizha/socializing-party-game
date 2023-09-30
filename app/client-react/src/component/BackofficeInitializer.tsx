import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { Query, Socket } from '../hook';
import { SocketStore, UserStore } from '../store';

const BackofficeInitializer = () => {
  // Socket.useOnConnected({});
  // Socket.useOnDisconnected({});
  Socket.useOnCurrentUserList({});

  Query.useGame();
  Query.useUsers();

  const isConnected = useAtomValue(SocketStore.isConnected);
  const nickname = useAtomValue(UserStore.nickname);
  const profilePictureUrl = useAtomValue(UserStore.profilePictureUrl);

  const { emitUserProfile } = Socket.useEmitUserProfile();

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    emitUserProfile({ nickname: '', profilePictureUrl });
  }, [emitUserProfile, isConnected, nickname, profilePictureUrl]);

  return <></>;
};

export default BackofficeInitializer;
