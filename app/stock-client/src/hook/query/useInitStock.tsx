import { useMutation } from '@tanstack/react-query';
import { Response } from 'shared~type';

const useUpdateGame = () => {
  const { mutateAsync } = useMutation<Response.Game>(['useInitStock'], async () => {
    const response = await fetch('http://localhost:3000/game/stock/init', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    return response.json();
  });

  return { mutateAsync };
};

export default useUpdateGame;
