import { useCallback, useEffect } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { QuizSchema } from 'shared~type';
import { server } from 'shared~config';
import { socket } from '../../library/socket-io';
import { QuizStore } from '../../store';

interface Props {
  onCallback?: () => void;
}

const useOnQuizStop = ({ onCallback }: Props) => {
  const callback = useAtomCallback<void, [QuizSchema]>(
    useCallback(
      (get, set, quiz) => {
        console.debug('🚀 ~ file: useOnQuizStop.tsx:16 ~ useOnQuizStop ~ quiz:', quiz);
        set(QuizStore.currentPhaseIdx, quiz.currentPhaseIdx);
        set(QuizStore.isAnswerTime, quiz.isAnswerTime);
        set(QuizStore.offsetByPhase, quiz.offsetByPhase);
        set(QuizStore.recordByPhase, quiz.recordByPhase);
        onCallback?.();
      },
      [onCallback],
    ),
  );

  useEffect(() => {
    socket.on(server.quizStopAnswer, callback);
    return () => {
      socket.off(server.quizStopAnswer, callback);
    };
  }, [callback]);
};

export default useOnQuizStop;
