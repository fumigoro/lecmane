import { Box, Container } from '@mui/material';
import PageWrapper from '../components/common/BackgroundWrapper';
import { Header } from '../components/common/Header';
import Navigation from '../components/common/Navigation';


export const HomePage = () => {
  return (
    <PageWrapper >
      <Header pageTitle="レクマネ" />
      <Container maxWidth="xl">
        <Box height={100} />
      </Container>
      <Navigation page={0} />
    </PageWrapper>
  );
};
