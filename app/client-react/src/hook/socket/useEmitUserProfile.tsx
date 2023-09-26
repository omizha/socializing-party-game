import { useCallback } from 'react';
import { UserProfile } from 'shared~type';
import { socket } from '../../library/socket-io';

type InputUserProfile = {
  nickname: UserProfile['nickname'];
  profilePictureUrl?: UserProfile['profilePictureUrl'];
};

const useEmitUserProfile = () => {
  const emitUserProfile = useCallback((userProfile: InputUserProfile) => {
    userProfile.profilePictureUrl ??= '/default-avatar.png';
    socket.emit('setUserProfile', userProfile);
  }, []);

  return { emitUserProfile };
};

export default useEmitUserProfile;
