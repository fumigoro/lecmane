import { Box, Container } from '@mui/material';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import { OneDaySchedule } from '../components/schedule/DailySchedule';
import useQueryParams from '../hooks/useQueryParams';

export const HomePage = () => {
  // クエリパラメータから日付を取得
  const { date } = useQueryParams<{ date: string }>();

  return (
    <PageWrapper>
      <Header pageTitle="ホーム" />
      <Container maxWidth="xl">
        <OneDaySchedule date={date ? new Date(date) : new Date()} />
        <Box height={100} />
      </Container>
      <MobileNavigation page="home" />
    </PageWrapper>
  );
};
