import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import React from 'react';
import { SocketIoStore } from '../../../store';

const CurrentUserList = () => {
  const userList = useAtomValue(SocketIoStore.userList);

  return (
    <Container>
      {userList.map((userProfile) => {
        return (
          <div key={`${userProfile.nickname}_${userProfile.profilePictureUrl}`}>
            <AvatarImage src={userProfile.profilePictureUrl} alt="profile" />
            <div>{userProfile.nickname}</div>
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  background-color: #eeeeee;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const AvatarImage = styled.img`
  width: 100px;
  height: 100px;
`;

export default CurrentUserList;
