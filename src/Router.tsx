import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import FavoritePage from './pages/Favorite.page';
import { HomePage } from './pages/Home.page';
import SchedulePage from './pages/Schedule.page';
import ClassesPage from './pages/Search.page';
import { mainTheme } from './styles/theme';

const Router = () => {
  return (
    <Box sx={{ background: { xs: '#fafafa', md: '#fff' }, fontFamily: 'Noto Sans JP' }}>
      <ThemeProvider theme={mainTheme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>
      </ThemeProvider>
    </Box>
  );
};

export default Router;
