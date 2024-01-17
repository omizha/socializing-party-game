import { getDateDistance } from '@toss/date';
import { objectEntries } from '@toss/utils';
import { Response } from 'shared~type-stock';
import { useQuery } from 'lib-react-query';
import { serverApiUrl } from '../../../config/baseUrl';

const useQueryStock = () => {
  const { data } = useQuery<Response.Stock>({
    api: {
      hostname: serverApiUrl,
      method: 'GET',
      pathname: '/stock',
    },
    reactQueryOption: {
      refetchInterval: 1000,
    },
  });

  if (!data) {
    return { data: undefined };
  }

  data.startedTime = new Date(data.startedTime);

  const timeIdx = Math.floor(getDateDistance(data.startedTime, new Date()).minutes / data.fluctuationsInterval);
  const companiesPrice = objectEntries(data.companies).reduce((source, [company, companyInfos]) => {
    if (timeIdx > 9) {
      source[company] = companyInfos[9].가격;
      return source;
    }

    source[company] = companyInfos[timeIdx].가격;
    return source;
  }, {} as Record<string, number>);

  return { companiesPrice, data, timeIdx };
};

export default useQueryStock;
