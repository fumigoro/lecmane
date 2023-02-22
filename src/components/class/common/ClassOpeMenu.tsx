import React from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import { orange } from '@mui/material/colors';
import { Class } from '../../../types/global';

type Props = {
  classItem: Class;
  open: boolean;
  setOpen: (o: boolean) => void;
};

const InfoBadge = styled(Box)(({ theme }) => ({
  padding: '1px 6px',
  textAlign: 'center',
  background: orange[200],
  fontWeight: 'bold',
  fontSize: 12,
  color: '#2b3c4e'
}));

export const ClassOpeMenu = ({ classItem, open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSyllabus = () => {
    setOpen(false);
    window.open(classItem.url, 'alss-portal.gifu-u.ac.jp');
  };

  const handleOpenDetailPage = (id: string, year: number) => {
    window.location.href = `/classes/${id}?y=${year}`;
  };

  return (
    <div>
      <Drawer anchor="bottom" open={open} onClose={handleClose}>
        <Box>
          <Typography variant="h6" m={1}>
            {classItem.title}
          </Typography>
          <Stack spacing={1} direction="row" m={1}>
            <Typography variant="body2">{classItem.year}年度</Typography>
            <InfoBadge sx={{ borderRadius: 3 }}>{classItem.grade}年次</InfoBadge>
            <InfoBadge sx={{ borderRadius: 3 }}>{classItem.semester}</InfoBadge>
            <InfoBadge sx={{ borderRadius: 3 }}>{classItem.weekday}</InfoBadge>
            <InfoBadge sx={{ borderRadius: 3 }}>{classItem.time}</InfoBadge>
          </Stack>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <NumbersIcon />
                </ListItemIcon>
                <ListItemText primary={classItem.id} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary={classItem.room} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={classItem.teachers.join(' / ')} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={classItem.department + ' / ' + classItem.category + ' / ' + classItem.field} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary={classItem.credit + '単位'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => handleOpenSyllabus()}>
                <ListItemIcon>
                  <OpenInNewIcon />
                </ListItemIcon>
                <ListItemText primary="公式シラバスを開く" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={(event) => handleOpenDetailPage(classItem.id, classItem.year)}
                sx={{ bgcolor: orange[50] }}
              >
                <ListItemIcon>
                  <ArticleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="NEW! 講義の詳細を見る" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => handleClose()}>
                <ListItemIcon>
                  <CloseIcon />
                </ListItemIcon>
                <ListItemText primary="閉じる" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};
