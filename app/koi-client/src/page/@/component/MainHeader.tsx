import React from 'react';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { Query } from '../../../hook';
import { UserStore } from '../../../store';
import Header from '../../../component-presentation/Header';

const MainHeader = () => {
  const navigate = useNavigate();
  const supabaseSession = useAtomValue(UserStore.supabaseSession);

  const { data } = Query.Supabase.useQueryAvatarUrl({ supabaseSession });

  const isVisibleAvatar = !!data;

  return (
    <Header
      avatar={{
        isVisible: isVisibleAvatar,
        onClick: () => {
          navigate('/profile');
        },
        src: data,
      }}
    />
  );
};

export default MainHeader;
