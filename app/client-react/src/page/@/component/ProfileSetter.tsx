import { useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useRef, useState } from 'react';
import { UserStore } from '../../../store';
import { Query, Socket } from '../../../hook';
import { serverApiUrl } from '../../../config/baseUrl';

const ProfileSetter = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const profilePictureUrl = useAtomValue(UserStore.profilePictureUrl);
  const profilePictureFileInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const { emitUserProfile } = Socket.useEmitUserProfile();
  const { mutateAsync: UploadAvatar } = Query.useUploadAvatar();

  const onClick = useAtomCallback(
    useCallback(
      (get, set) => {
        if (!nicknameInputRef.current?.value) {
          return;
        }

        const nickname = nicknameInputRef.current.value;
        set(UserStore.nickname, nickname);

        emitUserProfile({ nickname, profilePictureUrl });
      },
      [emitUserProfile, profilePictureUrl],
    ),
  );

  const onChangeProfilePictureFile = useAtomCallback(
    useCallback(
      async (get, set, event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.[0]) {
          return;
        }
        const formData = new FormData();
        formData.append('file', event.target.files?.[0]);

        try {
          const { file } = await UploadAvatar(formData);
          set(UserStore.profilePictureUrl, `${serverApiUrl}/avatar/${file.filename}`);
        } catch {
          set(UserStore.profilePictureUrl, '/default-avatar.png');
        }
      },
      [UploadAvatar],
    ),
  );

  return (
    <>
      <ProfilePictureFileInput
        type="file"
        accept="image/*"
        onChange={onChangeProfilePictureFile}
        ref={profilePictureFileInputRef}
      />
      <ProfilePictureButton
        onClick={() => {
          profilePictureFileInputRef.current?.click();
        }}
      >
        <ProfilePicture src={profilePictureUrl} alt="프로필사진" />
      </ProfilePictureButton>
      <NicknameInput
        type="text"
        placeholder="닉네임"
        onChange={(e) => {
          setIsDisabled(!e.target.value);
        }}
        ref={nicknameInputRef}
      />
      <ProfileSaveButton disabled={isDisabled} onClick={onClick}>
        프로필 적용
      </ProfileSaveButton>
    </>
  );
};

const ProfilePictureFileInput = styled.input`
  display: none;
`;

const ProfilePictureButton = styled.button`
  width: 200px;
  height: 200px;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const ProfilePicture = styled.img`
  overflow: hidden;
  border-radius: 50%;
`;

const NicknameInput = styled.input`
  width: 200px;
  height: 30px;
  margin-bottom: 15px;
`;

const ProfileSaveButton = styled.button`
  width: 100%;
  height: 30px;
`;

export default ProfileSetter;
