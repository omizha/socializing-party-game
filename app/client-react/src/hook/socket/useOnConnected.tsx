import { useCallback, useEffect } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { socket } from '../../library/socket-io';
import { SocketStore } from '../../store';

interface Props {
  onConnect?: () => void;
}

/**
 * @deprecated 작동 안됨
 */
const useOnConnected = ({ onConnect }: Props) => {
  const onConnectCallback = useAtomCallback(
    useCallback(
      (get, set) => {
        console.log('connected');
        set(SocketStore.isConnected, true);
        onConnect?.();
      },
      [onConnect],
    ),
  );

  useEffect(() => {
    socket.on('connect', onConnectCallback);
    return () => {
      socket.off('connect', onConnectCallback);
    };
  }, [onConnectCallback]);
};

export default useOnConnected;
