import React from 'react';
import { Query } from '../../hook';

const Backoffice = () => {
  const { data } = Query.Poll.useQueryPollList();
  console.debug('🚀 ~ file: index.tsx:6 ~ Backoffice ~ data:', data);

  return <></>;
};

export default Backoffice;
