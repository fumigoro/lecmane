import { Paper, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StarIcon from '@mui/icons-material/Star';

import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

type NavigationProps = {
  page: number;
};
const Navigation: React.FunctionComponent<NavigationProps> = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ height: '80px' }}></Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation value={props.page} sx={{ height: '60px' }} showLabels>
          <BottomNavigationAction sx={{ p: 0 }} label="ホーム" icon={<HomeIcon />} onClick={() => navigate(`/`)} />
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="講義検索"
            icon={<SearchIcon />}
            onClick={() => navigate(`/classes`)}
          />
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="時間割"
            icon={<EventNoteIcon />}
            onClick={() => navigate(`/schedule`)}
          />
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="お気に入り"
            icon={<StarIcon />}
            onClick={() => navigate(`/favorite`)}
          />
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="マイページ"
            icon={<AccountCircleIcon />}
            onClick={() => navigate(`/mypage`)}
          />
        </BottomNavigation>
        <Box sx={{ height: '15px' }}></Box>
      </Paper>
    </>
  );
};

export default Navigation;
