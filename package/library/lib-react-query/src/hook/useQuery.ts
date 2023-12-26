import { UseQueryOptions, UseQueryResult, useQuery as useQueryBase } from '@tanstack/react-query';

type Props<TData> = {
  api: Api;
  reactQueryOption?: Omit<UseQueryOptions<TData, unknown, TData>, 'queryKey' | 'queryFn'>;
};

type Api = {
  hostname?: string;
  pathname: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: HeadersInit;
  signal?: AbortSignal;
  body?: object;
};

const useQuery = <TData = unknown>({ api, reactQueryOption }: Props<TData>): UseQueryResult<TData, unknown> => {
  const url = `${api.hostname}${api.pathname}`;

  return useQueryBase(
    [url, api.method, api.body],
    async () => {
      const res = await fetch(url, {
        body: JSON.stringify(api.body),
        headers: api.headers,
        keepalive: true,
        method: api.method,
        signal: api.signal,
      });
      return res.json();
    },
    reactQueryOption,
  );
};

export default useQuery;
