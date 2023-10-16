import { useQuery } from '@tanstack/react-query';
import { UserSchema } from 'shared~type-stock';

const useUsers = () => {
  const { data, isSuccess } = useQuery<UserSchema[]>(
    ['useUsers'],
    async () => {
      const response = await fetch('http://localhost:3000/game/user', {
        method: 'GET',
      });

      return response.json();
    },
    {
      refetchInterval: 1000,
    },
  );

  return { data: data ?? [] };
};

export default useUsers;
