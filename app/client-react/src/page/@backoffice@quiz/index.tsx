import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { SwitchCase } from '@toss/react';
import { quiz } from 'shared~config';
import { useNavigate } from 'react-router-dom';
import BackofficeInitializer from '../../component/BackofficeInitializer';
import useTimeout from '../../hook/useTimeout';
import { Query, Socket } from '../../hook';
import QuizResult from './component/QuizResult';

export default function Quiz() {
  const [selectedProblems, setSelectedProblems] = useState<{ idx: number; selected: boolean }[]>(
    Array.from({ length: quiz.length }, (v, i) => ({
      idx: i,
      selected: false,
    })),
  );
  console.debug('🚀 ~ file: index.tsx:18 ~ Quiz ~ selectedProblems:', selectedProblems);
  const [problemIdx, setProblemIdx] = useState<number>(() => {
    const idx = Math.floor(Math.random() * quiz.length);
    setSelectedProblems((prev) => {
      prev[idx].selected = true;
      return prev;
    });
    return idx;
  });
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('quiz');
  const [visibleProblem2, setVisibleProblem2] = useState<boolean>(false);

  const { data: game } = Query.Game.useGame();
  console.debug('🚀 ~ file: index.tsx:22 ~ Quiz ~ game:', game);
  const { emitQuizAnswerTime } = Socket.useEmitQuizAnswerTime();
  const { emitQuizAnswerStop } = Socket.useEmitQuizAnswerStop();
  const [setTimeout, clearTimeout] = useTimeout();
  useEffect(() => {
    setTimeout(() => {
      emitQuizAnswerTime({
        answer: quiz[problemIdx].답,
        quizId: `${game?.quizId}`,
      });
    }, 3000);
  }, [emitQuizAnswerTime, game?.quizId, problemIdx, setTimeout]);

  Socket.useOnQuizStart({
    onCallback: () => {
      setVisibleProblem2(true);
      setTimeout(() => {
        emitQuizAnswerStop({
          quizId: `${game?.quizId}`,
        });
      }, 10000);
    },
  });

  Socket.useOnQuizStop({
    onCallback: () => {
      setPhase('result');
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!game) {
      return;
    }

    if (game.gamePhase === 'CROWDING') {
      navigate('/backoffice/', { replace: true });
    }

    if (!game.quizId) {
      navigate('/backoffice/select', { replace: true });
    }
  }, [game, navigate]);

  const onExamNewProblem = useCallback(() => {
    console.debug('🚀 ~ file: index.tsx:78 ~ onExamNewProblem ~ selectedProblems:', selectedProblems);
    const noSelectedProblems = selectedProblems.filter((v) => !v.selected);
    const idx = Math.floor(Math.random() * noSelectedProblems.length);
    setProblemIdx(noSelectedProblems[idx].idx);
    setPhase('quiz');
  }, [selectedProblems]);

  return (
    <Container>
      <BackofficeInitializer />
      <SwitchCase
        value={phase}
        caseBy={{
          quiz: (
            <>
              <div>{quiz[problemIdx].문제1}</div>
              <div>{visibleProblem2 && quiz[problemIdx].문제2}</div>
            </>
          ),
          result: <QuizResult onExamNewProblem={onExamNewProblem} />,
        }}
        defaultComponent={<>{phase}</>}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  // padding: 20px;
`;
