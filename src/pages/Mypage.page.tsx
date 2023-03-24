import { Container, Typography } from '@mui/material';
import { CreditSummary } from '../components/credit/CreditSummary';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';

const Mypage = () => {
  return (
    <PageWrapper bgColored>
      <Header pageTitle="マイページ" />
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          あなたの履修状況
        </Typography>
      </Container>
      <CreditSummary />

      <MobileNavigation />
    </PageWrapper>
  );
};

export default Mypage;
