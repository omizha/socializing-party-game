import styled from '@emotion/styled';

interface Props {
  HeaderComponent?: JSX.Element;
}

const Waiting = ({ HeaderComponent = <></> }: Props) => {
  return (
    <Container>
      {HeaderComponent}
      <BodyContainer>
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
