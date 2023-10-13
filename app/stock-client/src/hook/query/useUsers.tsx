import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { UserSchema } from 'shared~type';
import { useEffect } from 'react';
import { SocketStore } from '../../store';

const useUsers = () => {
  const { data, isSuccess } = useQuery<UserSchema[]>(['useUsers'], async () => {
    const response = await fetch('http://localhost:3000/game/user', {
      method: 'GET',
    });

    return response.json();
  });

  const setUserList = useSetAtom(SocketStore.userList);

  useEffect(() => {
    if (isSuccess && data) {
      setUserList(data);
    }
  }, [data, isSuccess, setUserList]);

  return { data };
};

export default useUsers;
