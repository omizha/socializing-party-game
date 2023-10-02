import styled from '@emotion/styled';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { Socket } from '../../../../hook';
import { GameStore, QuizStore, UserStore } from '../../../../store';

const QuizSelectAnswer = () => {
  const [isEnabledButton, setIsEnabledButton] = useState(false);

  Socket.useOnQuizStart({
    onCallback: () => {
      setIsEnabledButton(true);
    },
  });

  Socket.useOnQuizStop({
    onCallback: () => {
      setIsEnabledButton(false);
    },
  });

  const phaseIdx = useAtomValue(QuizStore.currentPhaseIdx);
  const quizId = useAtomValue(GameStore.quizId);
  const nickname = useAtomValue(UserStore.nickname);
  const { emitQuizSubmit } = Socket.useEmitQuizSubmit();
  const onClick = (answer: 'O' | 'X') => {
    emitQuizSubmit({
      answer,
      nickname,
      phaseIdx,
      quizId,
    });
    setIsEnabledButton(false);
  };

  return (
    <Container>
      <AnswerButton
        disabled={!isEnabledButton}
        onClick={() => {
          onClick('O');
        }}
      >
        O
      </AnswerButton>
      <AnswerButton
        disabled={!isEnabledButton}
        onClick={() => {
          onClick('X');
        }}
      >
        X
      </AnswerButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  gap: 20px;
`;

const AnswerButton = styled.button`
  display: flex;
  width: 100%;
  height: 300px;
`;

export default QuizSelectAnswer;
