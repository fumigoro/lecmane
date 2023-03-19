import { Box, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import { OneDaySchedule } from '../components/schedule/DailySchedule';

export const HomePage = () => {
  // クエリパラメータから日付を取得
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const date = query.get('date');

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
