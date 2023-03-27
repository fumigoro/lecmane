import { Box, Container, Divider, Typography } from '@mui/material';
import { DeleteAccount } from '../components/account/DeleteAccount';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import { InAppLink } from '../components/general/InAppLink';
import MobileNavigation from '../components/general/Navigation';
import useGA4PageEvent from '../hooks/useGA4PageEvent';
import { StorageIO, Key } from '../lib/storage';

const SettingPage = () => {
  useGA4PageEvent();
  return (
    <PageWrapper>
      <Header pageTitle="設定" showBackButton />
      <Container sx={{ my: 2 }}>
        <Box
          py={2}
          onClick={() => {
            if (window.confirm('お気に入りをリセットしますか？この操作は取り消せません。')) {
              localStorage.clear();
              StorageIO.set(Key.SETUP_DONE, 'true');
              window.location.href = '/';
            }
          }}
        >
          <Typography gutterBottom>お気に入りをリセット</Typography>
          <Typography variant="body2" color="gray">
            講義のお気に入り登録を削除します
          </Typography>
        </Box>
        <Divider />
        <Box
          py={2}
          onClick={() => {
            const data = StorageIO.get(Key.FAVORITE_LIST);
            localStorage.clear();
            StorageIO.set(Key.SETUP_DONE, 'true');
            if (data) {
              StorageIO.set(Key.FAVORITE_LIST, data);
            }
            window.alert('キャッシュを削除しました');
          }}
        >
          <Typography gutterBottom>キャッシュを削除</Typography>
          <Typography variant="body2" color="gray">
            一時保存している講義データを削除します
          </Typography>
        </Box>
        <Divider />
        <InAppLink to="/terms">
          <Box py={2}>
            <Typography gutterBottom>利用規約とプライバシーポリシー</Typography>
            <Typography variant="body2" color="gray">
              利用規約とプライバシーポリシーを開く
            </Typography>
          </Box>
        </InAppLink>
        <Divider />
        <DeleteAccount />
      </Container>
      <MobileNavigation />
    </PageWrapper>
  );
};

export default SettingPage;
