import { useCallback, useEffect } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { QuizSchema } from 'shared~type';
import { server } from 'shared~config';
import { socket } from '../../library/socket-io';
import { QuizStore } from '../../store';

interface Props {
  onCallback?: () => void;
}

const useOnQuizStart = ({ onCallback }: Props) => {
  const callback = useAtomCallback<void, [QuizSchema]>(
    useCallback(
      (get, set, quiz) => {
        console.debug('🚀 ~ file: useOnQuizStart.tsx:16 ~ useOnQuizStart ~ quiz:', quiz);
        set(QuizStore.currentPhaseIdx, quiz.currentPhaseIdx);
        set(QuizStore.isAnswerTime, quiz.isAnswerTime);
        set(QuizStore.offsetByPhase, quiz.offsetByPhase);
        onCallback?.();
      },
      [onCallback],
    ),
  );

  useEffect(() => {
    socket.on(server.quizStartAnswer, callback);
    return () => {
      socket.off(server.quizStartAnswer, callback);
    };
  }, [callback]);
};

export default useOnQuizStart;
