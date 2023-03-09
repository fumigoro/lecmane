import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import ClassDetailPage from './pages/ClassDetail.page';
import FavoritePage from './pages/Favorite.page';
import FeaturesPage from './pages/Features.page';
import { HomePage } from './pages/Home.page';
import Mypage from './pages/Mypage.page';
import RoomsPage from './pages/Rooms.page';
import SchedulePage from './pages/Schedule.page';
import ClassesPage from './pages/Search.page';
import TextbookPage from './pages/Textbook.page';
import { mainTheme } from './styles/theme';

const Router = () => {
  return (
    <Box sx={{ background: { xs: '#fafafa', md: '#fff' }, fontFamily: 'Noto Sans JP' }}>
      <ThemeProvider theme={mainTheme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/profile" element={<Mypage />} />

          <Route path="/classes/:id" element={<ClassDetailPage />} />
          <Route path="/features/textbook" element={<TextbookPage />} />
          <Route path="/features/favorite" element={<FavoritePage />} />
          <Route path="/features/rooms" element={<RoomsPage />} />
        </Routes>
      </ThemeProvider>
    </Box>
  );
};

export default Router;
