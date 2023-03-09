import { Container, Stack } from '@mui/material';
import PageWrapper from '../components/general/BackgroundWrapper';
import { FeatureCard } from '../components/general/FeatureIcon';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';

const FeaturesPage = () => {
  return (
    <PageWrapper bgColored>
      <Header pageTitle="ツール" />
      <Container maxWidth="xl">
        <Stack spacing={2} sx={{ my: 4 }}>
          <FeatureCard title="教科書リスト" description="必要な教科書をリストで確認" to="/features/textbook" />
          <FeatureCard title="お気に入り" description="お気に入り登録した講義を確認" to="/features/favorite" />
        </Stack>
      </Container>
      <MobileNavigation page="features" />
    </PageWrapper>
  );
};

export default FeaturesPage;
