import { useMutation } from '@tanstack/react-query';
import { Response } from 'shared~type';
import { Request } from 'shared~type-stock';
import { serverApiUrl } from '../../../config/baseUrl';

const useSellStock = () => {
  const { mutateAsync } = useMutation<Response.Game, unknown, Request.SellStock>(['useSellStock'], async (data) => {
    const response = await fetch(`${serverApiUrl}/game/stock/sell`, {
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

export default useSellStock;
