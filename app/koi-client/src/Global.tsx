import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from 'lib-react-query';
import App from './page/@';
import Stock from './page/@backoffice';
import Screen from './page/@screen';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
  },
  {
    element: <Stock />,
    path: '/backoffice',
  },
  {
    element: <Screen />,
    path: '/screen',
  },
]);

const Global: React.FC = () => {
  return (
    <QueryClientProvider>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              cardBg: '#BBB',
              inkBarColor: '#FFFF44',
            },
          },
          token: {
            fontFamily: 'DungGeunMo',
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default Global;
