import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import QueryClientProvider from './library/react-query/QueryClientProvider';
import Backoffice from './page/@backoffice';
import App from './page/@';
import useOnConnected from './hook/socket/useOnConnected';
import useOnDisonnected from './hook/socket/useOnDisconnected';
import Users from './page/@users';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
  },
  {
    element: <Users />,
    path: '/users',
  },
  {
    element: <Backoffice />,
    path: '/backoffice',
  },
]);

const Global: React.FC = () => {
  useOnConnected({});
  useOnDisonnected({});

  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default Global;
