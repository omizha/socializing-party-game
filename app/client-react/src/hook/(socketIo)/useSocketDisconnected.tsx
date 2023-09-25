import { useCallback, useEffect } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { socket } from '../../library/socket-io';
import { SocketIoStore } from '../../store';

interface Props {
  onDisconnect?: () => void;
}

const useSocketDisonnected = ({ onDisconnect }: Props) => {
  const onDisconnectCallback = useAtomCallback(
    useCallback(
      (get, set) => {
        set(SocketIoStore.isConnected, false);
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

export default useSocketDisonnected;
