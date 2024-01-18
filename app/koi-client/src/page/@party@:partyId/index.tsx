import { Suspense } from 'react';
import MobileLayout from '../../component-presentation/MobileLayout';
import PartyHeader from './component/MainHeader';
import Selector from './component/Selector';

export default function Party() {
  return (
    <MobileLayout
      HeaderComponent={
        <Suspense fallback={<></>}>
          <PartyHeader />
        </Suspense>
      }
    >
      <Suspense>
        <Selector />
      </Suspense>
    </MobileLayout>
  );
}
