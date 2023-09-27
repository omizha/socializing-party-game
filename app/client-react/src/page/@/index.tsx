import { useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStore } from '../../store';
import { useEmitUserProfile } from '../../hook/socket';

export default function App() {
  const nickname = useAtomValue(UserStore.nickname);

  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const naviage = useNavigate();
  const { emitUserProfile } = useEmitUserProfile();

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

  return (
    <Container>
      {/* <ProfilePictureButton>
        <ProfilePicture src="/default-avatar.png" alt="기본 프로필사진" />
      </ProfilePictureButton> */}
      {/* <input type="file" accept="image/*" /> */}
      <NicknameInput type="text" placeholder="닉네임" ref={nicknameInputRef} />
      <ProfileSaveButton onClick={onClick}>입장</ProfileSaveButton>
      {/* <CommandContainer>
        <ProfileSetter />
      </CommandContainer>
      <hr />
      <div>연결 상태 : {`${isConnected}`}</div>
      <div
        css={css`
          height: 30px;
        `}
      >
        현재 닉네임 : {nickname}
      </div>
      <CurrentUserList /> */}
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

const CommandContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
`;
