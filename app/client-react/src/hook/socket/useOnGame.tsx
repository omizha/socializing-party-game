import { useCallback, useEffect } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { GameSchema } from 'shared~type';
import { server } from 'shared~config';
import { socket } from '../../library/socket-io';
import { GameStore } from '../../store';

interface Props {
  onCallback?: () => void;
}

const useOnGame = ({ onCallback }: Props) => {
  const callback = useAtomCallback<void, [GameSchema]>(
    useCallback(
      (get, set, game) => {
        set(GameStore.gamePhase, game.gamePhase);
        onCallback?.();
      },
      [onCallback],
    ),
  );

  useEffect(() => {
    socket.on(server.gameInfo, callback);
    return () => {
      socket.off(server.gameInfo, callback);
    };
  }, [callback]);
};

export default useOnGame;
