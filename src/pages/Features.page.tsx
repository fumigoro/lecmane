import { Container, Stack } from '@mui/material';
import PageWrapper from '../components/general/BackgroundWrapper';
import { FeatureCard, FeatureCardDisabled } from '../components/general/FeatureIcon';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import StarIcon from '@mui/icons-material/Star';
import RoomIcon from '@mui/icons-material/Room';
import { mainTheme } from '../styles/theme';

const iconProps = {
  sx: {
    fontSize: 40,
    color: mainTheme.palette.primary.main
  }
};
const disabledIconProps = {
  sx: {
    fontSize: 40,
    color: 'gray'
  }
};

const FeaturesPage = () => {
  return (
    <PageWrapper bgColored>
      <Header pageTitle="ツール" />
      <Container maxWidth="xl">
        <Stack spacing={2} sx={{ my: 4 }}>
          <FeatureCard
            title="教科書リスト"
            description="必要な教科書をリストで確認"
            to="/features/textbook"
            icon={<ImportContactsIcon {...iconProps} />}
          />
          <FeatureCard
            title="お気に入り"
            description="お気に入り登録した講義を確認"
            to="/features/favorite"
            icon={<StarIcon {...iconProps} />}
          />
          <FeatureCardDisabled
            title="空き教室検索"
            description="自習などに使える教室を検索"
            disabledReason="講義期間中のみ利用できます"
            icon={<RoomIcon {...disabledIconProps} />}
          />
        </Stack>
      </Container>
      <MobileNavigation page="features" />
    </PageWrapper>
  );
};

export default FeaturesPage;
