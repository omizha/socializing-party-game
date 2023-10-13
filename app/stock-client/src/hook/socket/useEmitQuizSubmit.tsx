import { useCallback } from 'react';
import { client } from 'shared~config';
import { Request } from 'shared~type';
import { socket } from '../../library/socket-io';

const useEmitQuizSubmit = () => {
  const emitQuizSubmit = useCallback((payload: Request.QuizSubmit) => {
    socket.emit(client.quizSubmit, payload);
  }, []);

  return { emitQuizSubmit };
};

export default useEmitQuizSubmit;
