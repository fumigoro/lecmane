import { Box, Container } from '@mui/material';

import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import Navigation from '../components/general/Navigation';

export const HomePage = () => {
  return (
    <PageWrapper bgColored>
      <Header pageTitle="レクマネ" />
      <Container maxWidth="xl">
        <Box height={100} />
      </Container>
      <Navigation page={0} />
    </PageWrapper>
  );
};
