import React from 'react';
import { SwitchCase } from '@toss/react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import MobileLayout from '../../component-presentation/MobileLayout';
import Splash from './Splash';
import { supabase } from '../../library/supabase';
import authLocalization from '../../library/supabase/authLocalization';

const NoSession = () => {
  const [route, setRoute] = React.useState('SPLASH');

  return (
    <SwitchCase
      value={route}
      caseBy={{
        AUTH: (
          <MobileLayout>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]}
              localization={authLocalization}
            />
          </MobileLayout>
        ),
        SPLASH: (
          <MobileLayout backgroundColor="#00000000">
            <Splash onAuthDetail={() => setRoute('AUTH')} />
          </MobileLayout>
        ),
      }}
    />
  );
};

export default NoSession;
