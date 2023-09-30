import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import QueryClientProvider from './library/react-query/QueryClientProvider';
import App from './page/@';
import Users from './page/@backoffice';
import Select from './page/@backoffice@select';
import Quiz from './page/@backoffice@quiz';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
  },
  {
    element: <Users />,
    path: '/backoffice',
  },
  {
    element: <Select />,
    path: '/backoffice/select',
  },
  {
    element: <Quiz />,
    path: '/backoffice/quiz',
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
