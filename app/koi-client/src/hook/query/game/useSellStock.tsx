import { useMutation } from '@tanstack/react-query';
import { Response } from 'shared~type';
import { Request } from 'shared~type-koi';
import { serverApiUrl } from '../../../config/baseUrl';
import handleResponse from '../../../service/handleResponse';

const useSellStock = () => {
  const { mutateAsync, isLoading } = useMutation<Response.Game, unknown, Request.SellStock>(
    ['useSellStock'],
    async (data) => {
      const response = await fetch(`${serverApiUrl}/game/stock/sell`, {
        body: JSON.stringify(data),
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

export default useSellStock;
