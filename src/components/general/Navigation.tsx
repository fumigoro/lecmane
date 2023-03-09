import { Paper, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

type Props = {
  page?: 'home' | 'schedule' | 'classes' | 'features' | 'profile';
};

const MobileNavigation = ({ page }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ height: '80px' }}></Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation value={page} sx={{ height: '60px' }} showLabels>
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="ホーム"
            icon={<HomeIcon />}
            value="home"
            onClick={() => navigate(`/`)}
          />
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="時間割"
            value="schedule"
            icon={<EventNoteIcon />}
            onClick={() => navigate(`/schedule`)}
          />
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="講義検索"
            value="classes"
            icon={<SearchIcon />}
            onClick={() => navigate(`/classes`)}
          />
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="ツール"
            value="features"
            icon={<HomeRepairServiceIcon />}
            onClick={() => navigate(`/features`)}
          />
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="マイページ"
            value="profile"
            icon={<AccountCircleIcon />}
            onClick={() => navigate(`/profile`)}
          />
        </BottomNavigation>
        <Box sx={{ height: '15px' }}></Box>
      </Paper>
    </>
  );
};

export default MobileNavigation;
