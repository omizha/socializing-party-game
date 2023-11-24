import { useMutation } from '@tanstack/react-query';
import { Response } from 'shared~type';
import { serverApiUrl } from '../../../config/baseUrl';
import handleResponse from '../../../service/handleResponse';

const useFinishStock = () => {
  const { mutateAsync, isLoading } = useMutation<Response.Game>(
    ['useFinishStock'],
    async () => {
      const response = await fetch(`${serverApiUrl}/game/stock/finish`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      return handleResponse(response);
    },
    {
      useErrorBoundary: false,
    },
  );

  return { isLoading, mutateAsync };
};

export default useFinishStock;
