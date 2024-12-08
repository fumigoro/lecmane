import { Alert, Box, Button, Card, Typography, AlertTitle, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { RoomSearchMethod } from '../../types/global';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
type Props = {
  setMethod: (m: RoomSearchMethod) => void;
};

export const RoomSearchModeSelect = ({ setMethod }: Props) => {
  const SearchMethods = [
    {
      title: '時間で検索',
      subtitle: '今空いている教室をさがす',
      icon: <AccessTimeIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      onClick: () => setMethod('time')
    },
    {
      title: '場所で検索',
      subtitle: 'この教室の空き時間をさがす',
      icon: <PlaceOutlinedIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      onClick: () => setMethod('room')
    }
  ];

  return (
    <Box my={4}>
      <Typography my={2} align="center" variant="h4">
        検索方法を選んでください
      </Typography>
      <Stack spacing={2}>
        <Alert severity="info">
          <AlertTitle sx={{ display: 'inline' }}>空き教室検索の仕組み</AlertTitle>
          <ul>
            <li>シラバスの教室情報から、指定の時間に講義がない教室を検索できます。</li>
            <li>利用可能と表示されても、教室変更や講義以外での利用がされている場合もあります。</li>
            <li>空き教室の利用ルールについては各建物管理者（学務係等）の指示に従ってください。</li>
          </ul>
        </Alert>

        {SearchMethods.map((method, index) => (
          <Button key={index} fullWidth sx={{ p: 0, textAlign: 'inherit' }} onClick={() => method.onClick()}>
            <Card sx={{ width: '100%' }} variant="outlined">
              <Stack direction="row" alignItems="center" sx={{ p: 2 }} gap={1}>
                <Box flexGrow={0}>{method.icon}</Box>
                <Box flexGrow={1}>
                  <Typography variant="h5">{method.title}</Typography>
                  <Typography color="gray">{method.subtitle}</Typography>
                </Box>
                <KeyboardArrowRightIcon sx={{ fontSize: 32, flexGrow: 0 }} />
              </Stack>
            </Card>
          </Button>
        ))}
      </Stack>
    </Box>
  );
};
