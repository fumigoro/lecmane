import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import NumbersIcon from '@mui/icons-material/Numbers';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { styled } from '@mui/material/styles';
import { Class } from '../../../types/global';
import { useNavigate } from 'react-router-dom';
import { classApi } from '../../../classes.api';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { getCategoryColor } from '../../../lib/main';

type Props = {
  classItem: Class;
  open: boolean;
  setOpen: (o: boolean) => void;
  isFavorite?: boolean;
  setIsFavorite?: (o: boolean) => void;
};

const InfoBadge = styled(Box)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  padding: '2px 6px',
  textAlign: 'center',
  fontSize: 12,
  borderRadius: 10
}));

export const ClassOpeMenu = ({
  classItem,
  open,
  setOpen,
  setIsFavorite: setIsFavoriteProp,
  isFavorite: isFavoriteProp
}: Props) => {
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSyllabus = () => {
    setOpen(false);
    const syllabusUrl = `https://alss-portal.gifu-u.ac.jp/campusweb/slbssbdr.do?value(risyunen)=${classItem.year}&value(semekikn)=1&value(kougicd)=${classItem.id}`;
    window.open(syllabusUrl, 'alss-portal.gifu-u.ac.jp');
  };

  const handleOpenDetailPage = (id: string, year: number) => {
    navigate(`/classes/${id}?y=${year}`);
  };

  const color = getCategoryColor(classItem.department);

  const isFavorite = isFavoriteProp !== undefined ? isFavoriteProp : classApi.isFavorite(classItem.year, classItem.id);

  const basicData = [
    {
      icon: NumbersIcon,
      label: '履修コード',
      value: classItem.id
    },
    {
      icon: LocationOnIcon,
      label: '教室',
      value: classItem.room
    },
    {
      icon: PersonIcon,
      label: '教員',
      value: classItem.teachers.join(' / ')
    },
    {
      icon: CategoryIcon,
      label: '分類',
      value: classItem.department + ' / ' + classItem.category + ' / ' + classItem.field
    },
    {
      icon: AccountBalanceIcon,
      label: '単位数',
      value: classItem.credit + '単位'
    }
  ];

  return (
    <div>
      <Drawer anchor="bottom" open={open} onClose={handleClose}>
        <Box sx={{ mx: 2 }}>
          <Stack sx={{}} direction="row" justifyContent="space-between" alignItems="center">
            <Typography color="gray" my={2}>
              講義詳細
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Paper variant="outlined" sx={{ p: 2, background: isFavorite ? color[50] : 'white' }}>
            <Typography variant="h5" gutterBottom>
              {classItem.title}
            </Typography>
            <Stack spacing={1} direction="row" my={2} alignItems="center">
              <InfoBadge sx={{ background: color['500'], color: 'white' }}>{classItem.year}年度</InfoBadge>
              <InfoBadge sx={{ background: color['500'], color: 'white' }}>{classItem.grade}年次</InfoBadge>
              <InfoBadge sx={{ background: color['500'], color: 'white' }}>{classItem.semester}</InfoBadge>
              <InfoBadge sx={{ background: color['500'], color: 'white' }}>{classItem.weekday}</InfoBadge>
              <InfoBadge sx={{ background: color['500'], color: 'white' }}>{classItem.time}</InfoBadge>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            {basicData.map((d) => (
              <Stack my={1} direction="row" alignItems="center" key={d.label}>
                <d.icon sx={{ fontSize: 20, mr: 2 }} />
                <Typography>{d.value}</Typography>
              </Stack>
            ))}
          </Paper>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={(event) => handleOpenSyllabus()}>
              <ListItemIcon>
                <OpenInNewIcon />
              </ListItemIcon>
              <ListItemText primary="公式シラバスを開く" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={(event) => handleOpenDetailPage(classItem.id, classItem.year)}>
              <ListItemIcon>
                <ArticleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="講義の詳細を見る" />
            </ListItemButton>
          </ListItem>
          {isFavorite && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={(event) => {
                    if (setIsFavoriteProp) {
                      setIsFavoriteProp(false);
                    } else {
                      classApi.removeFavorite(classItem.year, classItem.id);
                      window.location.reload();
                    }
                  }}
                >
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="お気に入りから削除" secondary="現在の状態：登録済み" />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          )}
          {!isFavorite && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={(event) => {
                    if (setIsFavoriteProp) {
                      setIsFavoriteProp(true);
                    } else {
                      classApi.addFavorite(classItem.year, classItem.id);
                      window.location.reload();
                    }
                  }}
                >
                  <ListItemIcon>
                    <StarBorderIcon />
                  </ListItemIcon>
                  <ListItemText primary="お気に入り登録" secondary="現在の状態：未登録" />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          )}
          <ListItem disablePadding>
            <ListItemButton onClick={(event) => handleClose()}>
              <ListItemIcon>
                <CloseIcon />
              </ListItemIcon>
              <ListItemText primary="閉じる" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
