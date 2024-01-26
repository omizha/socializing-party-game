import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from 'lib-react-query';
import { useAtom } from 'jotai';
import Main from './page/@';
import SupabaseProvider from './library/supabase/SupabaseProvider';
import { UserStore } from './store';
import BackofficePoll from './page/@backoffice@poll';
import Profile from './page/@profile';
import Party from './page/@party@:partyId';
import Backoffice from './page/@backoffice';
import BackofficeParty from './page/@backoffice@party';
import NoSession from './component/NoSession';
import BackofficeStock from './page/@backoffice@stock';
import BackofficeScreen from './page/@backoffice@screen@:partyId';

const router = createBrowserRouter([
  {
    element: <Main />,
    path: '/',
  },
  {
    element: <Party />,
    path: '/party/:partyId',
  },
  {
    element: <Profile />,
    path: '/profile',
  },
  {
    element: <Backoffice />,
    path: '/backoffice',
  },
  {
    element: <BackofficePoll />,
    path: '/backoffice/poll',
  },
  {
    element: <BackofficeParty />,
    path: '/backoffice/party',
  },
  {
    element: <BackofficeStock />,
    path: '/backoffice/stock',
  },
  {
    element: <BackofficeScreen />,
    path: '/backoffice/screen/:partyId',
  },
]);

const Global: React.FC = () => {
  const [supabaseSession, setSupabaseSession] = useAtom(UserStore.supabaseSession);

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
        <SupabaseProvider
          supabaseSession={supabaseSession}
          setSupabaseSession={setSupabaseSession}
          noSessionComponent={<NoSession />}
        >
          <RouterProvider router={router} />
        </SupabaseProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default Global;
