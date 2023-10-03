import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { GameSchema } from 'shared~type';
import { GameStore } from '../../store';

const useSetGameQuiz = () => {
  const { mutateAsync, isSuccess, data } = useMutation<GameSchema>(['useSetGameQuiz'], async () => {
    const response = await fetch('http://localhost:3000/game/quiz', {
      method: 'POST',
    });

    return response.json();
  });

  const setQuizId = useSetAtom(GameStore.quizId);
  const setPhase = useSetAtom(GameStore.gamePhase);

  useEffect(() => {
    if (isSuccess && data) {
      setQuizId(`${data.quizId}`);
      setPhase(data.gamePhase);
    }
  }, [data, isSuccess, setPhase, setQuizId]);

  return { mutateAsync };
};

export default useSetGameQuiz;
