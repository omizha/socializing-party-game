import { useQuery } from 'lib-react-query';
import { PartySchemaWithId } from 'shared~type-party';
import { serverApiUrl } from '../../../config/baseUrl';

const useQueryParty = (partyId: string | undefined) => {
  const { data } = useQuery<PartySchemaWithId>({
    api: {
      hostname: serverApiUrl,
      method: 'GET',
      pathname: `/party/${partyId}`,
    },
    reactQueryOption: {
      enabled: !!partyId,
    },
  });

  return { data };
};

export default useQueryParty;
