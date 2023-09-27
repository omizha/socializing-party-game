import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import QueryClientProvider from './library/react-query/QueryClientProvider';
import App from './page/@';
import Users from './page/@backoffice@users';
import { Socket } from './hook';
import { SocketIoStore, UserStore } from './store';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
  },
  {
    element: <Users />,
    path: '/backoffice/users',
  },
]);

const Global: React.FC = () => {
  Socket.useOnConnected({});
  Socket.useOnDisconnected({});
  Socket.useOnCurrentUserList({});

  const isConnected = useAtomValue(SocketIoStore.isConnected);
  const nickname = useAtomValue(UserStore.nickname);
  const profilePictureUrl = useAtomValue(UserStore.profilePictureUrl);

  const { emitUserProfile } = Socket.useEmitUserProfile();

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    emitUserProfile({ nickname, profilePictureUrl });
  }, [emitUserProfile, isConnected, nickname, profilePictureUrl]);

  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default Global;
