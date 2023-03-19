import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import { DailySchedule } from '../components/schedule/DailySchedule';

export const HomePage = () => {
  return (
    <PageWrapper>
      <Header pageTitle="ホーム" />
      <DailySchedule />
      <MobileNavigation page="home" />
    </PageWrapper>
  );
};
