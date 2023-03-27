import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import { DailySchedule } from '../components/schedule/DailySchedule';
import useGA4PageEvent from '../hooks/useGA4PageEvent';

export const HomePage = () => {
  useGA4PageEvent();
  return (
    <PageWrapper>
      <Header pageTitle="ホーム" />
      <DailySchedule />
      <MobileNavigation page="home" />
    </PageWrapper>
  );
};
