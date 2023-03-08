import { Container } from '@mui/material';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import Navigation from '../components/general/Navigation';

const Mypage = () => {
  return (
    <PageWrapper bgColored>
      <Header pageTitle="マイページ" />
      <Container maxWidth="xl"></Container>
      <Navigation page={4} />
    </PageWrapper>
  );
};

export default Mypage;
