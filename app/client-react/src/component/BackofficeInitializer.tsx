import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { Socket } from '../hook';
import { SocketIoStore, UserStore } from '../store';

const BackofficeInitializer = () => {
  Socket.useOnConnected({});
  Socket.useOnDisconnected({});
  Socket.useOnCurrentUserList({});

  const isConnected = useAtomValue(SocketIoStore.isConnected);
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
