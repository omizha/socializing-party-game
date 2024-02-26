import { getDateDistance } from '@toss/date';
import { objectEntries } from '@toss/utils';
import { Response } from 'shared~type-stock';
import { useQuery } from 'lib-react-query';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { serverApiUrl } from '../../../config/baseUrl';

const useQueryStock = (stockId: string | undefined) => {
  const { data } = useQuery<Response.GetStock>({
    api: {
      hostname: serverApiUrl,
      method: 'GET',
      pathname: `/stock?stockId=${stockId}`,
    },
    reactQueryOption: {
      enabled: !!stockId,
      refetchInterval: 1000,
    },
  });

  const timeIdx = data?.startedTime
    ? Math.floor(getDateDistance(dayjs(data.startedTime).toDate(), new Date()).minutes / data.fluctuationsInterval)
    : undefined;

  const companiesPrice = useMemo(
    () =>
      data?.startedTime && timeIdx !== undefined
        ? objectEntries(data.companies).reduce((source, [company, companyInfos]) => {
            if (timeIdx > 9) {
              source[company] = companyInfos[9].가격;
              return source;
            }

            source[company] = companyInfos[timeIdx].가격;
            return source;
          }, {} as Record<string, number>)
        : {},
    [data?.companies, data?.startedTime, timeIdx],
  );

  return { companiesPrice, data, timeIdx };
};

export default useQueryStock;
