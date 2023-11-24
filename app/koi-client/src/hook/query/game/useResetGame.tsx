import { useMutation } from '@tanstack/react-query';
import { Response } from 'shared~type-koi';
import { serverApiUrl } from '../../../config/baseUrl';

const useResetGame = () => {
  const { mutateAsync } = useMutation<Response.Game>(['useResetGame'], async () => {
    const response = await fetch(`${serverApiUrl}/game/reset`, {
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
