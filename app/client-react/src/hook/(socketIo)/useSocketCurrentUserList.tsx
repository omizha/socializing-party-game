import { useCallback, useEffect } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { UserProfile } from 'shared~type';
import { socket } from '../../library/socket-io';
import { SocketIoStore } from '../../store';

interface Props {
  onCallback?: () => void;
}

const useSocketCurrentUserList = ({ onCallback }: Props) => {
  const callback = useAtomCallback<void, [UserProfile[]]>(
    useCallback(
      (get, set, userProfiles) => {
        const profiles = [] as UserProfile[];
        for (const userProfile of userProfiles) {
          if (!profiles.some((v) => v.nickname === userProfile.nickname)) profiles.push(userProfile);
        }

        set(SocketIoStore.userList, profiles);
        onCallback?.();
      },
      [onCallback],
    ),
  );

  useEffect(() => {
    socket.on('currentUserList', callback);
    return () => {
      socket.off('currentUserList', callback);
    };
  }, [callback]);
};

export default useSocketCurrentUserList;
