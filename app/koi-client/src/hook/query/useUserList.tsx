import { useQuery } from '@tanstack/react-query';
import { UserSchema } from 'shared~type-koi';
import { serverApiUrl } from '../../config/baseUrl';

const useUserList = () => {
  const { data, isSuccess } = useQuery<UserSchema[]>(
    ['useUserList'],
    async () => {
      const response = await fetch(`${serverApiUrl}/game/user`, {
        method: 'GET',
      });

      return response.json();
    },
    {
      refetchInterval: 1000,
    },
  );

  if (!data) {
    return { data: [] };
  }

  data.forEach((v) => {
    v.lastActivityTime = new Date(v.lastActivityTime);
  });

  return { data: data ?? [] };
};

export default useUserList;
