import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStore } from '../../store';
import { Query } from '../../hook';
import MobileLayout from '../../component-presentation/MobileLayout';
import MainHeader from './component/MainHeader';

export default function Party() {
  const supabaseSession = useAtomValue(UserStore.supabaseSession);
  const navigate = useNavigate();

  const { data, isFetching } = Query.Supabase.useMyProfile({ supabaseSession });
  const username = data?.data?.username;

  useEffect(() => {
    if (!isFetching && !username) {
      navigate('/profile');
    }
  }, [isFetching, navigate, username]);

  if (!supabaseSession) return <></>;

  return <MobileLayout HeaderComponent={<MainHeader />} />;
}
