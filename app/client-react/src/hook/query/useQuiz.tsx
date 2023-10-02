import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { GameSchema, QuizSchema } from 'shared~type';
import { GameStore, QuizStore } from '../../store';

const useQuiz = () => {
  const { data, isSuccess } = useQuery<{ game: GameSchema; quiz: QuizSchema }>(['useQuiz'], async () => {
    const response = await fetch('http://localhost:3000/game/quiz', {
      method: 'GET',
    });

    return response.json();
  });

  const setQuizId = useSetAtom(GameStore.quizId);
  const setIsAnswerTime = useSetAtom(QuizStore.isAnswerTime);
  const setCurrentPhaseIdx = useSetAtom(QuizStore.currentPhaseIdx);
  const setOffsetByPhase = useSetAtom(QuizStore.offsetByPhase);

  useEffect(() => {
    if (isSuccess && data) {
      setQuizId(`${data.game.quizId}`);
      setIsAnswerTime(data.quiz.isAnswerTime);
      setCurrentPhaseIdx(data.quiz.currentPhaseIdx);
      setOffsetByPhase(data.quiz.offsetByPhase);
    }
  }, [data, isSuccess, setCurrentPhaseIdx, setIsAnswerTime, setOffsetByPhase, setQuizId]);
};

export default useQuiz;
