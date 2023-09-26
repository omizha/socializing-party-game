import { useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UserStore, SocketIoStore } from '../../store';
import CurrentUserList from './component/CurrentUserList';

export default function Users() {
  const nickname = useAtomValue(UserStore.nickname);
  const isConnected = useAtomValue(SocketIoStore.isConnected);

  return (
    <Container>
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding: 20px;
`;
