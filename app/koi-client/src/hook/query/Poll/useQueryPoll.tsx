import { getQueryKey, useQuery } from 'lib-react-query';
import { PollSchemaWithId } from 'shared~type-poll';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { serverApiUrl } from '../../../config/baseUrl';
import { socket } from '../../../library/socket-io';

const useQueryPoll = (pollId: string | undefined) => {
  const queryClient = useQueryClient();
  const { data } = useQuery<PollSchemaWithId>({
    api: {
      hostname: serverApiUrl,
      method: 'GET',
      pathname: `/poll/${pollId}`,
    },
    reactQueryOption: {
      enabled: !!pollId,
      refetchOnWindowFocus: false,
    },
  });

  useEffect(() => {
    socket.on(`/poll/${pollId}`, (data: PollSchemaWithId) => {
      queryClient.setQueryData<PollSchemaWithId>(
        getQueryKey({
          hostname: serverApiUrl,
          method: 'GET',
          pathname: `/poll/${pollId}`,
        }),
        () => {
          console.debug('🚀 ~ file: useQueryPoll.tsx:32 ~ socket.on ~ data:', data);
          return { ...data };
        },
      );
    });
    return () => {
      socket.off(`/poll/${pollId}`);
    };
  }, [pollId, queryClient]);

  return { data };
};

export default useQueryPoll;
