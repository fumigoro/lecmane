import { Paper, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
type Props = {
  page?: 'home' | 'schedule' | 'classes' | 'features' | 'setting';
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
            value="home"
            icon={<HomeIcon sx={{ fontSize: 24 }} />}
            onClick={() => navigate(`/`)}
          />
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="時間割"
            value="schedule"
            icon={<EventNoteIcon sx={{ fontSize: 24 }} />}
            onClick={() => navigate(`/schedule`)}
          />
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="講義検索"
            value="classes"
            icon={<SearchIcon sx={{ fontSize: 24 }} />}
            onClick={() => navigate(`/classes`)}
          />
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="ツール"
            value="features"
            icon={<HomeRepairServiceIcon sx={{ fontSize: 24 }} />}
            onClick={() => navigate(`/features`)}
          />
          <BottomNavigationAction
            sx={{ p: 0 }}
            label="マイページ"
            value="setting"
            icon={<AccountCircleIcon sx={{ fontSize: 24 }} />}
            onClick={() => navigate(`/profile`)}
          />
        </BottomNavigation>
        <Box sx={{ height: '15px' }}></Box>
      </Paper>
    </>
  );
};

export default MobileNavigation;
