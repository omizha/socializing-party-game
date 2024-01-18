import styled from '@emotion/styled';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useRef, useState } from 'react';
import { UserStore } from '../../../store';
import { useSetUser } from '../../../hook/query';

const ProfileSetter = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync } = useSetUser();

  const onClick = useAtomCallback(
    useCallback(
      async (get, set) => {
        if (!nicknameInputRef.current?.value) {
          return;
        }

        const nickname = nicknameInputRef.current.value;
        set(UserStore.nickname, nickname);

        await mutateAsync({ inventory: {}, lastActivityTime: new Date(), money: 1000000, nickname });
      },
      [mutateAsync],
    ),
  );

  return (
    <>
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

const NicknameInput = styled.input`
  width: 200px;
  height: 30px;
  margin-bottom: 15px;
`;

const ProfileSaveButton = styled.button`
  width: 200px;
  height: 30px;
`;

export default ProfileSetter;
