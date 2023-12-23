import { useQuery } from 'lib-react-query';
import { serverApiUrl } from '../../../config/baseUrl';

const useQueryPollList = () => {
  const { data } = useQuery({
    api: {
      hostname: serverApiUrl,
      method: 'GET',
      pathname: '/poll',
    },
  });

  return { data };
};

export default useQueryPollList;
