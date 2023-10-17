import styled from '@emotion/styled';
import { Suspense, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentUserList from './component/CurrentUserList';
import LeftPanel from './component/LeftPanel';
import BackofficeInitializer from '../../component/BackofficeInitializer';
import { Query } from '../../hook';

export default function Users() {
  const navigate = useNavigate();
  const { mutateAsync } = Query.Game.useUpdateGame();

  const onStartGame = useCallback(() => {
    mutateAsync({
      gamePhase: 'WAITING',
    }).then(() => {
      navigate('/backoffice/select');
    });
  }, [mutateAsync, navigate]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onStartGame();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [onStartGame]);

  return (
    <Container>
      <BackofficeInitializer />
      <LeftPanel />
      <CurrentUserListWrap>
        <Suspense fallback={<></>}>
          <CurrentUserList />
        </Suspense>
      </CurrentUserListWrap>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  // padding: 20px;
`;

const CurrentUserListWrap = styled.div`
  background-color: #eeeeee;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
