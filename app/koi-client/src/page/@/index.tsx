import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { styled } from '@linaria/react';
import MobileLayout from '../../component-presentation/MobileLayout';
import { Query } from '../../hook';
import MainHeader from './component/MainHeader';

export default function Main() {
  const { data: partyList } = Query.Party.useQueryPartyList();

  if (!partyList) {
    return <></>;
  }

  return (
    <MobileLayout HeaderComponent={<MainHeader />}>
      <Wrapper>
        {partyList.map((party) => {
          return (
            <Card key={party._id} title={party.title}>
              <Link to={`/party/${party._id}`}>참가</Link>
            </Card>
          );
        })}
      </Wrapper>
    </MobileLayout>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 8px;
`;
