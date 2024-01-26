import { useQuery } from 'lib-react-query';
import { UserSchema } from 'shared~type-stock';
import { serverApiUrl } from '../../../config/baseUrl';

const useUserList = (stockId: string) => {
  const { data } = useQuery<UserSchema[]>({
    api: {
      hostname: serverApiUrl,
      method: 'GET',
      pathname: `/stock/user?stockId=${stockId}`,
    },
    reactQueryOption: {
      refetchInterval: 1000,
    },
  });

  if (!data) {
    return { data: [] };
  }

  data.forEach((v) => {
    v.lastActivityTime = new Date(v.lastActivityTime);
  });

  return { data: data ?? [] };
};

export default useUserList;
