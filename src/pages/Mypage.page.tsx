import { Container, Stack } from '@mui/material';
import PageWrapper from '../components/general/BackgroundWrapper';
import { FeatureCard } from '../components/general/FeatureIcon';
import { Header } from '../components/general/Header';
import Navigation from '../components/general/Navigation';

const Mypage = () => {
  return (
    <PageWrapper bgColored>
      <Header pageTitle="マイページ" />
      <Container maxWidth="xl">
        <Stack spacing={2} sx={{ my: 4 }}>
          <FeatureCard title="教科書リスト" description="必要な教科書をリストで確認" />
        </Stack>
      </Container>
      <Navigation page={4} />
    </PageWrapper>
  );
};

export default Mypage;
