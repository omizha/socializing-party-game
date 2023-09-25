import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useEffect, useRef } from 'react';
import { UserStore } from '../../../store';
import { socket } from '../../../library/socket-io';

const ProfileSetter = () => {
  const nickname = useAtomValue(UserStore.nickname);
  const profilePictureUrl = useAtomValue(UserStore.profilePictureUrl);

  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const profilePictureUrlInputRef = useRef<HTMLInputElement>(null);
  const ProfileApplyButtonRef = useRef<HTMLButtonElement>(null);

  const onChangeProfile = useAtomCallback<void, []>(
    useCallback((get, set) => {
      const nicknameInputValue = nicknameInputRef.current?.value;
      if (nicknameInputValue) {
        set(UserStore.nickname, nicknameInputValue);
      }

      const profilePictureUrlInputValue = profilePictureUrlInputRef.current?.value;
      if (profilePictureUrlInputValue) {
        set(UserStore.profilePictureUrl, profilePictureUrlInputValue);
      }
    }, []),
  );

  useEffect(() => {
    if (profilePictureUrlInputRef.current) {
      profilePictureUrlInputRef.current.value = profilePictureUrl;
    }
  }, [profilePictureUrl]);

  useEffect(() => {
    if (nicknameInputRef.current) {
      nicknameInputRef.current.value = nickname;
    }
  }, [nickname]);

  useEffect(() => {
    if (nickname && profilePictureUrl) socket.emit('setUserProfile', { nickname, profilePictureUrl });
  }, [nickname, profilePictureUrl]);

  return (
    <>
      <input
        type="text"
        placeholder="닉네임"
        ref={nicknameInputRef}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            ProfileApplyButtonRef.current?.click();
          }
        }}
      />
      <input
        type="text"
        placeholder="프로필 사진 URL"
        ref={profilePictureUrlInputRef}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            ProfileApplyButtonRef.current?.click();
          }
        }}
      />
      <button ref={ProfileApplyButtonRef} onClick={onChangeProfile}>
        프로필 변경
      </button>
    </>
  );
};

export default ProfileSetter;
