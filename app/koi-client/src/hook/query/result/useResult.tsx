import { useQuery } from '@tanstack/react-query';
import { Response } from 'shared~type-koi';
import { useCallback } from 'react';
import { serverApiUrl } from '../../../config/baseUrl';

const useResult = () => {
  const { data } = useQuery<Response.Result[]>(
    ['useResult'],
    async () => {
      const response = await fetch(`${serverApiUrl}/game/result`, {
        method: 'GET',
      });

      return response.json();
    },
    {
      refetchInterval: 500,
    },
  );

  const getRound0Avg = useCallback(
    (nickname: string) => {
      return data?.filter((v) => v.nickname === nickname && v.round === 0).reduce((acc, v) => acc + v.money, 0) ?? 0;
    },
    [data],
  );

  const getRound12Avg = useCallback(
    (nickname?: string) => {
      return (
        (data?.filter((v) => v.nickname === nickname && v.round > 0).reduce((acc, v) => acc + v.money, 0) ?? 0) / 2
      );
    },
    [data],
  );

  return { data: data ?? [], getRound0Avg, getRound12Avg };
};

export default useResult;
