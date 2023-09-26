import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import { SocketIoStore } from '../../../store';
import useOnCurrentUserList from '../../../hook/socket/useOnCurrentUserList';
import { Socket } from '../../../hook';

const CurrentUserList = () => {
  useOnCurrentUserList({});

  const userList = useAtomValue(SocketIoStore.userList);

  const { requestUserList } = Socket.useRequestUserList();

  useEffect(() => {
    requestUserList();
  }, [requestUserList]);

  return (
    <Container>
      {userList.map((userProfile) => {
        return (
          <div key={userProfile.nickname}>
            <img src={userProfile.profilePictureUrl} alt="profile" />
            <div>{userProfile.nickname}</div>
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export default CurrentUserList;
