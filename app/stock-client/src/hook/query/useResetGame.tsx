import { useMutation } from '@tanstack/react-query';
import { Response } from 'shared~type-stock';

const useResetGame = () => {
  const { mutateAsync } = useMutation<Response.Game>(['useResetGame'], async () => {
    const response = await fetch('http://localhost:3000/game/reset', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    return response.json();
  });

  return { mutateAsync };
};

export default useResetGame;
