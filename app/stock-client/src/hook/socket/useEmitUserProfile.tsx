import { useCallback } from 'react';
import { UserSchema } from 'shared~type';
import { socket } from '../../library/socket-io';

type InputUserProfile = {
  nickname: UserSchema['nickname'];
  profilePictureUrl?: UserSchema['profilePictureUrl'];
};

const useEmitUserProfile = () => {
  const emitUserProfile = useCallback((userProfile: InputUserProfile) => {
    console.debug('🚀 ~ file: useEmitUserProfile.tsx:12 ~ emitUserProfile ~ userProfile:', userProfile);
    userProfile.profilePictureUrl ??= '/default-avatar.png';
    socket.emit('setUserProfile', userProfile);
  }, []);

  return { emitUserProfile };
};

export default useEmitUserProfile;
