type Api = {
  hostname?: string;
  pathname: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: object;
};

const getQueryKey = (api: Api): string[] => {
  const queryKey = [`${api.hostname}${api.pathname}`];
  if (api.method) {
    queryKey.push(api.method);
  }

  return queryKey;
};

export default getQueryKey;
