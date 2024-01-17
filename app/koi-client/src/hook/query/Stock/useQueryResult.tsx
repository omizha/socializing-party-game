import { Response } from 'shared~type-stock';
import { useCallback } from 'react';
import { useQuery } from 'lib-react-query';
import { serverApiUrl } from '../../../config/baseUrl';

const useQueryResult = () => {
  const { data } = useQuery<Response.Result[]>({
    api: {
      hostname: serverApiUrl,
      method: 'GET',
      pathname: '/stock/result',
    },
    reactQueryOption: {
      refetchInterval: 500,
    },
  });

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

export default useQueryResult;
