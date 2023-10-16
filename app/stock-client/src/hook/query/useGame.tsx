import { useQuery } from '@tanstack/react-query';
import { Response } from 'shared~type-stock';

const useGame = () => {
  const { data } = useQuery<Response.Game>(
    ['game'],
    async () => {
      const response = await fetch('http://localhost:3000/game', {
        method: 'GET',
      });

      return response.json();
    },
    {
      refetchInterval: 1000,
    },
  );

  if (!data) {
    return { data: undefined };
  }

  data.startedTime = new Date(data.startedTime);

  return { data };
};

export default useGame;
