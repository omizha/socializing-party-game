import { useCallback, useEffect } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { UserSchema } from 'shared~type';
import { server } from 'shared~config';
import { socket } from '../../library/socket-io';
import { SocketStore } from '../../store';

interface Props {
  onCallback?: () => void;
}

const useOnCurrentUserList = ({ onCallback }: Props) => {
  const callback = useAtomCallback<void, [UserSchema[]]>(
    useCallback(
      (get, set, userProfiles) => {
        set(SocketStore.userList, userProfiles);
        onCallback?.();
      },
      [onCallback],
    ),
  );

  useEffect(() => {
    socket.on(server.currentUserList, callback);
    return () => {
      socket.off(server.currentUserList, callback);
    };
  }, [callback]);
};

export default useOnCurrentUserList;
