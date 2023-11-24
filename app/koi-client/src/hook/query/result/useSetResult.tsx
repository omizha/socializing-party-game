import { useMutation } from '@tanstack/react-query';
import { Response } from 'shared~type-koi';
import { serverApiUrl } from '../../../config/baseUrl';

const useSetResult = () => {
  const { mutateAsync } = useMutation<Response.Result>(['useSetResult'], async () => {
    const response = await fetch(`${serverApiUrl}/game/result`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    return response.json();
  });

  return { mutateAsync };
};

export default useSetResult;
