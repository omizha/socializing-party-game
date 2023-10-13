import { useCallback } from 'react';
import { client } from 'shared~config';
import { Request } from 'shared~type';
import { socket } from '../../library/socket-io';

const useEmitQuizAnswerStop = () => {
  const emitQuizAnswerStop = useCallback((payload: Request.QuizAnswerStop) => {
    socket.emit(client.quizAnswerStop, payload);
  }, []);

  return { emitQuizAnswerStop };
};

export default useEmitQuizAnswerStop;
