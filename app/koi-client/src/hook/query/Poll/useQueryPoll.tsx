import { useQuery } from 'lib-react-query';
import { PollSchemaWithId } from 'shared~type-poll';
import { serverApiUrl } from '../../../config/baseUrl';

const useQueryPoll = (pollId: string | undefined) => {
  const { data } = useQuery<PollSchemaWithId>({
    api: {
      hostname: serverApiUrl,
      method: 'GET',
      pathname: `/poll/${pollId}`,
    },
    reactQueryOption: {
      enabled: !!pollId,
    },
  });

  return { data };
};

export default useQueryPoll;
