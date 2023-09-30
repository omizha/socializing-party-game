import styled from '@emotion/styled';
import { useState } from 'react';
import { SwitchCase } from '@toss/react';
import { QuizPhase } from 'shared~type';
import { quiz } from 'shared~config';
import BackofficeInitializer from '../../component/BackofficeInitializer';

export default function Quiz() {
  const [selectedProblems, setSelectedProblems] = useState<{ idx: number; selected: boolean }[]>(
    Array.from({ length: quiz.length }, (v, i) => ({
      idx: i,
      selected: false,
    })),
  );
  const [problemIdx, setProblemIdx] = useState<number>(() => Math.floor(Math.random() * quiz.length));
  const [phase, setPhase] = useState<QuizPhase>('quiz');

  return (
    <Container>
      <BackofficeInitializer />
      <SwitchCase
        value={phase}
        caseBy={{
          quiz: (
            <>
              <div>{quiz[problemIdx].문제1}</div>
              <div>{quiz[problemIdx].문제2}</div>
            </>
          ),
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
