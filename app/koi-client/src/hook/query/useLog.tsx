import { useQuery } from '@tanstack/react-query';
import { Response } from 'shared~type-koi';
import { serverApiUrl } from '../../config/baseUrl';

const useLog = (nickname: string) => {
  const { data } = useQuery<Response.Log[]>(
    ['useLog', nickname],
    async () => {
      const response = await fetch(`${serverApiUrl}/game/log?nickname=${nickname}`, {
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
    v.date = new Date(v.date);
  });

  return { data };
};

export default useLog;
