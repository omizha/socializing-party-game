import { Response } from 'shared~type-stock';
import { useMutation } from 'lib-react-query';
import { serverApiUrl } from '../../../config/baseUrl';

const useResetStock = () => {
  return useMutation<object, Response.Stock>({
    api: {
      hostname: serverApiUrl,
      method: 'POST',
      pathname: '/stock/reset',
    },
  });
};

export default useResetStock;
