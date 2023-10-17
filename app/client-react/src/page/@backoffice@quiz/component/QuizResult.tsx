import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { QuizRecordByPhase } from 'shared~type';
import { commaizeNumber } from '@toss/utils';
import { useNavigate } from 'react-router-dom';
import { QuizStore, SocketStore } from '../../../store';
import { Query } from '../../../hook';

type QuizRecord = QuizRecordByPhase & { nickname: string };

interface Props {
  onExamNewProblem: () => void;
}

const QuizResult = ({ onExamNewProblem }: Props) => {
  const currentPhaseIdx = useAtomValue(QuizStore.currentPhaseIdx);
  const offsetByPhase = useAtomValue(QuizStore.offsetByPhase);
  const recordByPhase = useAtomValue(QuizStore.recordByPhase);
  console.debug('🚀 ~ file: QuizResult.tsx:13 ~ QuizResult ~ recordByPhase:', recordByPhase);

  const userList = useAtomValue(SocketStore.userList);
  const { answer, examTime } = offsetByPhase[currentPhaseIdx - 1];

  const [correctedUser, setCorrectedUser] = useState<QuizRecord[]>([]);
  const [wrongUser, setWrongUser] = useState<QuizRecord[]>([]);
  const [noAnswerUser, setNoAnswerUser] = useState<QuizRecord[]>([]);

  useEffect(() => {
    const correctedUser = [] as QuizRecord[];
    const wrongUser = [] as QuizRecord[];
    const noAnswerUser = [] as QuizRecord[];

    Object.entries(recordByPhase[currentPhaseIdx - 1]).forEach(([nickname, record]) => {
      if (record.isCorrect) {
        correctedUser.push({ ...record, nickname });
      } else {
        wrongUser.push({ ...record, nickname });
      }
    });

    // recordTime 기준으로 내림차순
    correctedUser.sort((a, b) => b.recordTime - a.recordTime);
    wrongUser.sort((a, b) => b.recordTime - a.recordTime);

    setCorrectedUser(correctedUser);
    setWrongUser(wrongUser);
  }, [answer, currentPhaseIdx, recordByPhase]);

  const { mutateAsync: updateGame } = Query.Game.useUpdateGame();
  const navigate = useNavigate();
  useEffect(() => {
    const callback = (ev: KeyboardEvent) => {
      switch (ev.key) {
        case 'Enter':
          onExamNewProblem();
          break;
        case 'Backspace':
          updateGame({
            gamePhase: 'WAITING',
            quizId: null,
          }).then(() => {
            navigate('/backoffice/select');
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', callback);
    return () => {
      window.removeEventListener('keydown', callback);
    };
  });

  return (
    <Container>
      <h2>정답자</h2>
      <table>
        {correctedUser.map(({ recordTime, nickname, score }, index) => (
          <Tr key={nickname}>
            <Td>{index + 1}위</Td>
            <Td>
              <ProfilePicture
                src={userList.find((v) => v.nickname === nickname)?.profilePictureUrl}
                alt={`${nickname}의 프로필 사진`}
              />
              <>{nickname}</>
            </Td>
            <Td>
              {recordTime - examTime >= 1000 ? commaizeNumber(recordTime - examTime) : `0.${recordTime - examTime}`}초
            </Td>
            <Td>{score}</Td>
          </Tr>
        ))}
      </table>
      <h2>오답자</h2>
      <table>
        {wrongUser.map(({ recordTime, nickname, score }, index) => (
          <Tr key={nickname}>
            <Td>{index + 1}위</Td>
            <Td>
              <ProfilePicture
                src={userList.find((v) => v.nickname === nickname)?.profilePictureUrl}
                alt={`${nickname}의 프로필 사진`}
              />
              <>{nickname}</>
            </Td>
            <Td>
              {recordTime - examTime >= 1000 ? commaizeNumber(recordTime - examTime) : `0.${recordTime - examTime}`}초
            </Td>
            <Td>{score}</Td>
          </Tr>
        ))}
      </table>
      <h2>무응답자</h2>
      <table>
        {noAnswerUser.map(({ recordTime, nickname, score }, index) => (
          <Tr key={nickname}>
            <Td>{index + 1}위</Td>
            <Td>
              <ProfilePicture
                src={userList.find((v) => v.nickname === nickname)?.profilePictureUrl}
                alt={`${nickname}의 프로필 사진`}
              />
              <>{nickname}</>
            </Td>
            <Td>
              {recordTime - examTime >= 1000 ? commaizeNumber(recordTime - examTime) : `0.${recordTime - examTime}`}초
            </Td>
            <Td>{score}</Td>
          </Tr>
        ))}
      </table>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding: 20px;
`;

const Tr = styled.tr`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Td = styled.td`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ProfilePicture = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export default QuizResult;
