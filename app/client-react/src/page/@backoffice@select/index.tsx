import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import BackofficeInitializer from '../../component/BackofficeInitializer';

export default function Select() {
  const navigate = useNavigate();

  const onClickQuiz = () => {
    navigate('/backoffice/quiz');
  };

  return (
    <Container>
      <BackofficeInitializer />
      <button onClick={onClickQuiz}>스피드 퀴즈</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  // padding: 20px;
`;
