import { useCallback } from 'react';
import { socket } from '../../library/socket-io';

const useEmitRequestPhase = () => {
  const emitRequestPhase = useCallback(() => {
    socket.emit('requestPhase', {});
  }, []);

  return { emitRequestPhase };
};

export default useEmitRequestPhase;
