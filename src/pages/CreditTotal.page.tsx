import { Box } from '@mui/material';
import { CreditSummary } from '../components/credit/CreditSummary';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';

const CreditSummaryPage = () => {
  return (
    <PageWrapper bgColored>
      <Header pageTitle="単位集計" showBackButton />
      <Box sx={{ my: 4 }}>
        <CreditSummary />
      </Box>
      <MobileNavigation />
    </PageWrapper>
  );
};

export default CreditSummaryPage;
