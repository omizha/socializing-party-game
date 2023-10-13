import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Response } from 'shared~type';
import { GameStore } from '../../store';

const useGame = () => {
  const { data, isSuccess } = useQuery<Response.Game>(['game'], async () => {
    const response = await fetch('http://localhost:3000/game', {
      method: 'GET',
    });

    return response.json();
  });

  const setGamePhase = useSetAtom(GameStore.gamePhase);

  useEffect(() => {
    if (isSuccess && data) {
      setGamePhase(data.gamePhase);
    }
  }, [data, isSuccess, setGamePhase]);

  return { data };
};

export default useGame;
