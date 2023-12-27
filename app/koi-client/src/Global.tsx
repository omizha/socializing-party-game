import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from 'lib-react-query';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAtom } from 'jotai';
import Main from './page/@';
import SupabaseProvider from './library/supabase/SupabaseProvider';
import { supabase } from './library/supabase';
import authLocalization from './library/supabase/authLocalization';
import { UserStore } from './store';
import Backoffice from './page/@backoffice';
import MobileLayout from './component-presentation/MobileLayout';
import Profile from './page/@profile';

const router = createBrowserRouter([
  {
    element: <Main />,
    path: '/',
  },
  {
    element: <Profile />,
    path: '/profile',
  },
  {
    element: <Backoffice />,
    path: '/backoffice',
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
          noSessionComponent={
            <MobileLayout>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={[]}
                localization={authLocalization}
              />
            </MobileLayout>
          }
        >
          <RouterProvider router={router} />
        </SupabaseProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default Global;
