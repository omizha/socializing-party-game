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
        const profiles = [] as UserSchema[];
        for (const userProfile of userProfiles) {
          if (!profiles.some((v) => v.nickname === userProfile.nickname)) profiles.push(userProfile);
        }

        set(SocketStore.userList, profiles);
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
