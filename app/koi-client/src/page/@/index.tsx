import { Button, Card } from 'antd';
import { styled } from '@linaria/react';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../../component-presentation/MobileLayout';
import { Query } from '../../hook';
import MainHeader from './component/MainHeader';
import { UserStore } from '../../store';

export default function Main() {
  const navigate = useNavigate();
  const supabaseSession = useAtomValue(UserStore.supabaseSession);

  const { data: partyList } = Query.Party.useQueryPartyList();
  const { mutateAsync: joinParty } = Query.Party.useJoinParty();

  if (!partyList || !supabaseSession) {
    return <></>;
  }

  return (
    <MobileLayout HeaderComponent={<MainHeader />}>
      <Wrapper>
        {partyList.map((party) => {
          return (
            <Card key={party._id} title={party.title}>
              <Button
                type="primary"
                onClick={() => {
                  joinParty({ partyId: party._id, userId: supabaseSession?.user.id }).then(() => {
                    navigate(`/party/${party._id}`);
                  });
                }}
                // disabled={party.publicScope !== 'PUBLIC'}
              >
                참가
              </Button>
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
