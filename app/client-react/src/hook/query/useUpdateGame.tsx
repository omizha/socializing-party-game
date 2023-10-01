import { useMutation } from '@tanstack/react-query';
import { Request, Response } from 'shared~type';

const useUpdateGame = () => {
  const { mutateAsync } = useMutation<Response.Game, unknown, Request.UpdateGame>(['useUpdateGame'], async (game) => {
    const response = await fetch('http://localhost:3000/game', {
      body: JSON.stringify(game),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    });

    return response.json();
  });

  return { mutateAsync };
};

export default useUpdateGame;
