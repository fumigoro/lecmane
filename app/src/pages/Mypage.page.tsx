import { Avatar, Container, Paper, Stack, Typography } from '@mui/material';
import { CreditSummary } from '../components/credit/CreditSummary';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import useFirebaseProfile from '../hooks/useFirebaseProfile';
import PersonIcon from '@mui/icons-material/Person';

const Mypage = () => {
  const user = useFirebaseProfile();

  return (
    <PageWrapper>
      <Header pageTitle="マイページ" />
      <Container maxWidth="xl">
        {user && (
          <>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
              アカウント
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                {user && user.photoURL && (
                  <div>
                    <Avatar alt="アカウントアイコン" src={user.photoURL} />
                  </div>
                )}
                {!user.photoURL && (
                  <div>
                    <Avatar alt="アカウントアイコン">
                      <PersonIcon />
                    </Avatar>
                  </div>
                )}
                <Typography variant="h3">{user?.displayName}</Typography>
              </Stack>
              <Typography color="gray" variant="body2" mt={2}>
                プロフィール情報はLINEと連携しています
              </Typography>
            </Paper>
          </>
        )}
        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          あなたの履修状況
        </Typography>
      </Container>
      <CreditSummary />

      <MobileNavigation page="mypage" />
    </PageWrapper>
  );
};

export default Mypage;
