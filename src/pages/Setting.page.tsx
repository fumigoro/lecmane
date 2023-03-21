import { Box, Container, Divider, Typography } from '@mui/material';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import { InAppLink } from '../components/general/InAppLink';
import MobileNavigation from '../components/general/Navigation';
import { StorageIO, Key } from '../lib/storage';

const SettingPage = () => {
  return (
    <PageWrapper>
      <Header pageTitle="設定" />
      <Container sx={{ my: 2 }}>
        <Box
          py={2}
          onClick={() => {
            if (window.confirm('お気に入りをリセットしますか？この操作は取り消せません。')) {
              localStorage.clear();
              window.alert('お気に入り登録を削除しました');
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
            window.alert('キャッシュを削除しました');
            const data = StorageIO.get(Key.FAVORITE_LIST);
            localStorage.clear();
            if (data) {
              StorageIO.set(Key.FAVORITE_LIST, data);
            }
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
      </Container>
      <MobileNavigation page="setting" />
    </PageWrapper>
  );
};

export default SettingPage;
