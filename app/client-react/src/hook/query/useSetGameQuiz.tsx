import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { GameSchema } from 'shared~type';

const useSetGameQuiz = () => {
  const { mutateAsync, isSuccess, data } = useMutation<GameSchema>(['useSetGameQuiz'], async () => {
    const response = await fetch('http://localhost:3000/game/quiz', {
      method: 'POST',
    });

    return response.json();
  });

  // const setQuizId = useSetAtom(QuizStore.id);
  // const setIsAnswerTime = useSetAtom(QuizStore.isAnswerTime);
  // const setCurrentPhaseIdx = useSetAtom(QuizStore.currentPhaseIdx);
  // const setOffsetByPhase = useSetAtom(QuizStore.offsetByPhase);
  // const setRecordByPhase = useSetAtom(QuizStore.recordByPhase);

  useEffect(() => {
    if (isSuccess && data) {
      // setQuizId(data.id);
      // setIsAnswerTime(data.isAnswerTime);
      // setCurrentPhaseIdx(data.currentPhaseIdx);
      // setOffsetByPhase(data.offsetByPhase);
      // setRecordByPhase(data.recordByPhase);
    }
  }, [data, isSuccess]);

  return { mutateAsync };
};

export default useSetGameQuiz;
