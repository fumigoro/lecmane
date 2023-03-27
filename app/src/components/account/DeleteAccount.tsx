import { Box, Button } from '@mui/material';
import { deleteUser } from 'firebase/auth';
import useFirebaseProfile from '../../hooks/useFirebaseProfile';
export const DeleteAccount = () => {
  const user = useFirebaseProfile();

  const deleteAccount = () => {
    if (!user) {
      return;
    }
    if (
      !window.confirm(
        'アカウントを削除しますか？\n削除を実行すると、直ちに全てのユーザーデータが削除されます。この操作は取り消せません。'
      )
    ) {
      return;
    }
    localStorage.clear();
    deleteUser(user)
      .then(() => {
        window.alert('アカウントを削除しました。');
        window.location.href = '/';
      })
      .catch((error) => {
        window.alert(`アカウントが削除できませんでした。\n${error}`);
      });
  };

  return (
    <Box sx={{ my: 2 }}>
      {!user && (
        <Button fullWidth onClick={deleteAccount} color="error" disabled>
          ログイン中...
        </Button>
      )}
      {user && (
        <Button fullWidth onClick={deleteAccount} color="error">
          アカウントを削除する
        </Button>
      )}
    </Box>
  );
};
