import { Suspense } from 'react';
import { useAtomValue } from 'jotai';
import MobileLayout from '../../component-presentation/MobileLayout';
import PartyHeader from './component/MainHeader';
import Selector from './component/Selector';
import { UiStore } from '../../store';

export default function Party() {
  const backgroundColor = useAtomValue(UiStore.backgroundColor);
  const padding = useAtomValue(UiStore.padding);

  return (
    <MobileLayout
      backgroundColor={backgroundColor}
      padding={padding}
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
