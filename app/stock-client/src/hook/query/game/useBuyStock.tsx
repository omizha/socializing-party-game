import { useMutation } from '@tanstack/react-query';
import { Response } from 'shared~type';
import { Request } from 'shared~type-stock';
import { serverApiUrl } from '../../../config/baseUrl';

const useBuyStock = () => {
  const { mutateAsync } = useMutation<Response.Game, unknown, Request.BuyStock>(['useBuyStock'], async (data) => {
    const response = await fetch(`${serverApiUrl}/game/stock/buy`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    return response.json();
  });

  return { mutateAsync };
};

export default useBuyStock;
