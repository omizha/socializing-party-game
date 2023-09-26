import { useCallback } from 'react';
import { socket } from '../../library/socket-io';

const useRequestUserList = () => {
  const requestUserList = useCallback(() => {
    socket.emit('currentUserList', {});
  }, []);

  return { requestUserList };
};

export default useRequestUserList;
