import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { UserStore } from '../../../store';

interface Props {
  HeaderComponent?: JSX.Element;
}

const Waiting = ({ HeaderComponent = <></> }: Props) => {
  const nickname = useAtomValue(UserStore.nickname);

  return (
    <Container>
      {HeaderComponent}
      <BodyContainer>
        <div>반갑습니다 {nickname}님,</div>
        <br />
        <div>호스트의 지시를 따라주세요</div>
        <span />
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default Waiting;
