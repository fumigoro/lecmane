import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';

const SettingPage = () => {
  return (
    <PageWrapper>
      <Header pageTitle="設定" />
      <MobileNavigation page="setting" />
    </PageWrapper>
  );
};

export default SettingPage;
