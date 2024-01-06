import { useParams } from 'react-router-dom';
import { SwitchCase } from '@toss/react';
import { Query } from '../../hook';
import MobileLayout from '../../component-presentation/MobileLayout';
import PartyHeader from './component/MainHeader';
import Poll from './component/Poll';

export default function Party() {
  const { partyId } = useParams();
  const { data: party } = Query.Party.useQueryParty(partyId ?? '');

  if (!party) {
    return <></>;
  }

  return (
    <MobileLayout HeaderComponent={<PartyHeader title={party.title} />}>
      <SwitchCase
        value={party.activityId}
        caseBy={{
          POLL: <Poll />,
        }}
      />
    </MobileLayout>
  );
}
