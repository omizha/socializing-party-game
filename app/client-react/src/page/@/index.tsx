import { useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStore } from '../../store';
import { Query, Socket } from '../../hook';
import { serverApiUrl } from '../../config/baseUrl';

export default function App() {
  const profilePictureUrl = useAtomValue(UserStore.profilePictureUrl);
  const nickname = useAtomValue(UserStore.nickname);

  const profilePictureFileInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const naviage = useNavigate();
  const { emitUserProfile } = Socket.useEmitUserProfile();
  const { mutateAsync, isLoading } = Query.useUploadAvatar();

  const onClick = useAtomCallback(
    useCallback(
      (get, set) => {
        if (!nicknameInputRef.current?.value) {
          return;
        }

        set(UserStore.nickname, nicknameInputRef.current.value);
        emitUserProfile({ nickname });
        naviage('/users');
      },
      [emitUserProfile, naviage, nickname],
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
          const { file } = await mutateAsync(formData);
          set(UserStore.profilePictureUrl, `${serverApiUrl}/avatar/${file.filename}`);
        } catch {
          set(UserStore.profilePictureUrl, '/default-avatar.png');
        }

        // const reader = new FileReader();
        // reader.onload = () => {
        //   if (reader.readyState === 2) {
        //     set(UserStore.profilePictureUrl, reader.result as string);
        //   }
        // };
        // reader.readAsDataURL(event.target.files?.[0] as Blob);
      },
      [mutateAsync],
    ),
  );

  return (
    <Container>
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
        disabled={isLoading}
      >
        <ProfilePicture src={profilePictureUrl} alt="프로필사진" />
      </ProfilePictureButton>
      <NicknameInput type="text" placeholder="닉네임" ref={nicknameInputRef} />
      <ProfileSaveButton onClick={onClick}>입장</ProfileSaveButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding: 20px;
`;

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
