import { useCallback, useEffect } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { socket } from '../../library/socket-io';
import { SocketStore } from '../../store';

interface Props {
  onDisconnect?: () => void;
}

/**
 * @deprecated 작동 안됨
 */
const useOnDisconnect = ({ onDisconnect }: Props) => {
  const onDisconnectCallback = useAtomCallback(
    useCallback(
      (get, set) => {
        set(SocketStore.isConnected, false);
        onDisconnect?.();
      },
      [onDisconnect],
    ),
  );

  useEffect(() => {
    socket.on('disconnect', onDisconnectCallback);
    return () => {
      socket.off('disconnect', onDisconnectCallback);
    };
  }, [onDisconnectCallback]);
};

export default useOnDisconnect;
