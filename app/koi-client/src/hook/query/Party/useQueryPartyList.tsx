import { useQuery } from 'lib-react-query';
import { PartySchemaWithId } from 'shared~type-party';
import { serverApiUrl } from '../../../config/baseUrl';

const useQueryPartyList = () => {
  const { data } = useQuery<PartySchemaWithId[]>({
    api: {
      hostname: serverApiUrl,
      method: 'GET',
      pathname: '/party',
    },
  });

  return { data };
};

export default useQueryPartyList;
