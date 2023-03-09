import { Alert, Box, Button, Card, CardContent, Typography, AlertTitle, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { RoomSearchMethod } from '../../types/global';

type Props = {
  setMethod: (m: RoomSearchMethod) => void;
};

export const RoomSearchModeSelect = ({ setMethod }: Props) => {
  const SearchMethods = [
    {
      title: '時間割で検索',
      subtitle: '今空いている場所(教室)はどこ？',
      icon: <AccessTimeIcon sx={{ fontSize: 100 }} />,
      onClick: () => setMethod('time')
    },
    {
      title: '場所で検索',
      subtitle: 'この場所(教室)はいつ空いている？',
      icon: <PlaceOutlinedIcon sx={{ fontSize: 100 }} />,
      onClick: () => setMethod('room')
    }
  ];

  return (
    <Box my={4}>
      <Alert severity="info" sx={{ mb: 4 }}>
        <AlertTitle>この機能について</AlertTitle>
        シラバスに含まれる教室の情報を元に、指定した時間に講義がない教室を検索できます。利用可能と表示されても、教室変更や講義以外での利用がされている場合もありますのでご注意ください。
        <br />
        <b>空き教室の利用については各建物管理者（学務係等）の指示に従ってください。</b>
      </Alert>
      <Typography my={2} align="center" variant="h4">
        検索方法を選んでください
      </Typography>
      <Stack spacing={2}>
        {SearchMethods.map((method, index) => (
          <Button key={index} fullWidth sx={{ p: 0 }} onClick={() => method.onClick()}>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Box>{method.icon}</Box>
                <Box mt={2}>
                  <Typography variant="h6">{method.subtitle}</Typography>
                  <Typography color="gray">{method.title}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Button>
        ))}
      </Stack>

    </Box>
  );
};
