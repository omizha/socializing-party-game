import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from 'lib-react-query';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { css } from '@linaria/core';
import { useAtom } from 'jotai';
import App from './page/@';
import Stock from './page/@backoffice';
import Screen from './page/@screen';
import SupabaseProvider from './library/supabase/SupabaseProvider';
import { supabase } from './library/supabase';
import authLocalization from './library/supabase/authLocalization';
import { UserStore } from './store';

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
        <div
          className={css`
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
          `}
        >
          <div
            className={css`
              width: 100%;
              max-width: 360px;
              height: 100%;
              box-sizing: border-box;
              padding: 20px;
              background-color: #bbb;
              display: flex;
              flex-direction: column;
              justify-content: center;
            `}
          >
            <SupabaseProvider
              supabaseSession={supabaseSession}
              setSupabaseSession={setSupabaseSession}
              noSessionComponent={
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  providers={[]}
                  localization={authLocalization}
                />
              }
            >
              <RouterProvider router={router} />
            </SupabaseProvider>
          </div>
        </div>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default Global;
