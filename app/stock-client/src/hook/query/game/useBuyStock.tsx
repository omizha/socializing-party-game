import { useMutation } from '@tanstack/react-query';
import { Response } from 'shared~type';
import { Request } from 'shared~type-stock';
import { serverApiUrl } from '../../../config/baseUrl';
import handleResponse from '../../../service/handleResponse';

const useBuyStock = () => {
  const { mutateAsync, error } = useMutation<Response.Game, unknown, Request.BuyStock>(
    ['useBuyStock'],
    async (data) => {
      const response = await fetch(`${serverApiUrl}/game/stock/buy`, {
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
  console.debug('🚀 ~ file: useBuyStock.tsx:9 ~ useBuyStock ~ error:', error);

  return { mutateAsync };
};

export default useBuyStock;
