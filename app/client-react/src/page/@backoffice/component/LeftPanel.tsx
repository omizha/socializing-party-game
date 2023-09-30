import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { QRCodeSVG } from 'qrcode.react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketStore } from '../../../store';
import { Query } from '../../../hook';

const LeftPanel = () => {
  const userList = useAtomValue(SocketStore.userList);

  const navigate = useNavigate();
  const { mutateAsync } = Query.useUpdateGame();

  const onStartGame = useCallback(() => {
    mutateAsync({
      gamePhase: 'WAITING',
    }).then(() => {
      navigate('/backoffice/select');
    });
  }, [mutateAsync, navigate]);

  return (
    <Container>
      <QRCodeSVG width="340px" height="340px" value="http://127.0.0.1:5173" />
      <>{userList.length}명 참가 완료</>
      <button onClick={onStartGame}>게임 시작</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 100%;
  background-color: #dddddd;
  padding: 10px;
  gap: 20px;
`;

export default LeftPanel;
