import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import QueryClientProvider from './library/react-query/QueryClientProvider';
import App from './page/@';
import Users from './page/@backoffice';
import Wait from './page/@wait';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
  },
  {
    element: <Wait />,
    path: '/wait',
  },
  {
    element: <Users />,
    path: '/backoffice',
  },
]);

const Global: React.FC = () => {
  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default Global;
