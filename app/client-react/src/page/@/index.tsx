import styled from '@emotion/styled';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { elementId } from 'shared~config';
import UserInitializer from '../../component/UserInitializer';
import Waiting from './component/Waiting';
import Phase from './component/Phase';

export default function App() {
  const [resetKey, setResetKey] = useState(new Date()); // ErrorBoundary를 초기화하기 위한 키

  return (
    <Container>
      <ErrorBoundary
        fallback={
          <>
            <div>서버와 통신하는 중 문제가 생겼습니다!</div>
            <div>호스트에게 이 사실을 알리세요!</div>
            <button onClick={() => setResetKey(new Date())}>재시도</button>
          </>
        }
        resetKeys={[resetKey]}
      >
        <Suspense fallback={<Waiting />}>
          <UserInitializer>
            <Phase />
            <div id={elementId.profilePortal} />
          </UserInitializer>
        </Suspense>
      </ErrorBoundary>
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

  // box-sizing: border-box;
  // padding: 20px;
`;
