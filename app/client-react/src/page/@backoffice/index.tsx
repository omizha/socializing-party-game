import styled from '@emotion/styled';
import CurrentUserList from './component/CurrentUserList';
import LeftPanel from './component/LeftPanel';
import BackofficeInitializer from '../../component/BackofficeInitializer';

export default function Users() {
  return (
    <Container>
      <BackofficeInitializer />
      <LeftPanel />
      <CurrentUserList />
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
