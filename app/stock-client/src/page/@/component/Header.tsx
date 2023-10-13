import styled from '@emotion/styled';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { UserStore } from '../../../store';
import { Query } from '../../../hook';

interface Props {
  title?: string;
  hasQuitButton?: boolean;
}

const Header = ({ title, hasQuitButton }: Props) => {
  // const { Portal, openPortal } = usePortal({ targetEl: document.getElementById(elementId.profilePortal)! });

  const { mutateAsync: removeUser } = Query.useRemoveUser();

  const onQuit = useAtomCallback(
    useCallback(
      async (get, set) => {
        const nickname = get(UserStore.nickname);
        await removeUser(nickname);
        set(UserStore.nickname, '');
        set(UserStore.profilePictureUrl, UserStore.profilePictureUrlDefault);
      },
      [removeUser],
    ),
  );

  return (
    <Container>
      <LeftIconWrap>{hasQuitButton && <button onClick={onQuit}>나가기</button>}</LeftIconWrap>
      <TitleWrap>{title}</TitleWrap>
      <RightIconWrap />
    </Container>
  );
};

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 50px;

  background-color: #dd00dd;

  box-sizing: border-box;
  padding: 8px;
`;

const LeftIconWrap = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const RightIconWrap = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export default Header;
