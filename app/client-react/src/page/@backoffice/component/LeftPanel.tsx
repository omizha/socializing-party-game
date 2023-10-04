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
      <QRCodeContainer>
        <QRCodeTextWrapper>스마트폰 카메라로 스캔</QRCodeTextWrapper>
        <QRCodeWrapper>
          <QRCodeSVG width="340px" height="340px" value="http://127.0.0.1:5173" />
        </QRCodeWrapper>
      </QRCodeContainer>
      <UserListWrapper>
        {userList.map((user) => (
          <ProfileContainer key={user.nickname}>
            <Avatar src={user.profilePictureUrl} alt={`${user.nickname}님의 프로필 사진`} />
            <div>{user.nickname}</div>
          </ProfileContainer>
        ))}
      </UserListWrapper>
      {/* <>{userList.length}명 참가 완료</> */}
      {/* <button onClick={onStartGame}>게임 시작</button> */}
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

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const QRCodeTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #777777;
  border-radius: 0.4em;
  width: 340px;
  height: 80px;
  font-size: 32px;
  color: #ffffff;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: #777777;
    border-bottom: 0;
    margin-left: -20px;
    margin-bottom: -20px;
  }
`;

const QRCodeWrapper = styled.div`
  width: 340px;
  height: 340px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  padding: 20px;
  border: 10px solid #777777;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserListWrapper = styled.div`
  display: flex;
  flex: 0.7;
  width: 340px;
  background-color: #ddeedd;
`;

export default LeftPanel;
