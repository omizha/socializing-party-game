import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import QueryClientProvider from './library/react-query/QueryClientProvider';
import App from './page/@';
import Stock from './page/@backoffice';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
  },
  {
    element: <Stock />,
    path: '/backoffice',
  },
]);

const Global: React.FC = () => {
  return (
    <QueryClientProvider devtoolEnabled>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default Global;
