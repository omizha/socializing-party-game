import { useQuery } from '@tanstack/react-query';
import { Response } from 'shared~type-stock';
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

  if (!data) {
    return { data: [] };
  }

  return { data };
};

export default useResult;
