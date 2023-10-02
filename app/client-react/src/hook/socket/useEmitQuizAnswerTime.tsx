import { useCallback } from 'react';
import { client } from 'shared~config';
import { Request } from 'shared~type';
import { socket } from '../../library/socket-io';

const useEmitQuizAnswerTime = () => {
  const emitQuizAnswerTime = useCallback((payload: Request.QuizAnswerTime) => {
    console.log('emitQuizAnswerTime', payload);
    socket.emit(client.quizAnswerTime, payload);
  }, []);

  return { emitQuizAnswerTime };
};

export default useEmitQuizAnswerTime;
