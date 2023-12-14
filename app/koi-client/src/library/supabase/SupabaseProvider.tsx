import React, { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '.';

interface Props {
  noSessionComponent?: React.ReactNode;
  children: React.ReactNode;
}

const SupabaseProvider = ({ noSessionComponent, children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (noSessionComponent && !session) {
    return <>{noSessionComponent}</>;
  }

  return <>{children}</>;
};

export default SupabaseProvider;
