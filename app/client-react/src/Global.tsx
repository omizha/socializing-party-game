import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import QueryClientProvider from './library/react-query/QueryClientProvider';
import Backoffice from './page/@backoffice';
import App from './page/@';
import useSocketConnected from './hook/(socketIo)/useSocketConnected';
import useSocketDisonnected from './hook/(socketIo)/useSocketDisconnected';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
  },
  {
    element: <Backoffice />,
    path: '/backoffice',
  },
]);

const Global: React.FC = () => {
  useSocketConnected({});
  useSocketDisonnected({});

  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default Global;
