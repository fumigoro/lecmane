import { Container } from '@mui/material';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';

const Mypage = () => {
  return (
    <PageWrapper bgColored>
      <Header pageTitle="マイページ" />
      <Container maxWidth="xl"></Container>
      <MobileNavigation page="profile" />
    </PageWrapper>
  );
};

export default Mypage;
