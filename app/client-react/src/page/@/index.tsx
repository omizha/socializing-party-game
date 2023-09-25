import { useAtomValue } from 'jotai';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { UserStore, SocketIoStore } from '../../store';
import CurrentUserList from './component/CurrentUserList';
import ProfileSetter from './component/ProfileSetter';

export default function App() {
  const nickname = useAtomValue(UserStore.nickname);
  const isConnected = useAtomValue(SocketIoStore.isConnected);

  return (
    <Container>
      <CommandContainer>
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
      <CurrentUserList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const CommandContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
`;
