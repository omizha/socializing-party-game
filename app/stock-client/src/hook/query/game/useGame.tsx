import { useQuery } from '@tanstack/react-query';
import { getDateDistance } from '@toss/date';
import { objectEntries } from '@toss/utils';
import { Response } from 'shared~type-stock';
import { serverApiUrl } from '../../../config/baseUrl';

const useGame = () => {
  const { data } = useQuery<Response.Game>(
    ['game'],
    async () => {
      const response = await fetch(`${serverApiUrl}/game`, {
        method: 'GET',
      });

      return response.json();
    },
    {
      refetchInterval: 1000,
    },
  );

  if (!data) {
    return { data: undefined };
  }

  data.startedTime = new Date(data.startedTime);

  const timeIdx = Math.floor(getDateDistance(data.startedTime, new Date()).minutes / 5);
  const companiesPrice = objectEntries(data.companies).reduce((source, [company, companyInfos]) => {
    if (timeIdx > 9) {
      source[company] = companyInfos[9].가격;
      return source;
    }

    source[company] = companyInfos[timeIdx].가격;
    return source;
  }, {} as Record<string, number>);

  return { companiesPrice, data };
};

export default useGame;
