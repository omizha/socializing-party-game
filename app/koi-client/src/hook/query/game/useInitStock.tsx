import { useMutation } from '@tanstack/react-query';
import { Response } from 'shared~type';
import { serverApiUrl } from '../../../config/baseUrl';

const useUpdateGame = () => {
  const { mutateAsync } = useMutation<Response.Game>(['useInitStock'], async () => {
    const response = await fetch(`${serverApiUrl}/game/stock/init`, {
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
