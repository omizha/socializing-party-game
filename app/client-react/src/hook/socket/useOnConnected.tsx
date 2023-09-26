import { useCallback, useEffect } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { socket } from '../../library/socket-io';
import { SocketIoStore } from '../../store';

interface Props {
  onConnect?: () => void;
}

const useOnConnected = ({ onConnect }: Props) => {
  const onConnectCallback = useAtomCallback(
    useCallback(
      (get, set) => {
        set(SocketIoStore.isConnected, true);
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
