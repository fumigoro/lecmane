import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import ClassesPage from './pages/Classes.page';
import { theme } from './styles/theme';

const Router = () => {
  return (
    <Box sx={{ background: { xs: '#fafafa', md: '#fff' }, fontFamily: 'Noto Sans JP' }}>
      <ThemeProvider theme={theme}>
        <Routes>          
          <Route path='/' element={<HomePage />} />
          <Route path='/classes' element={<ClassesPage />} />
        </Routes>
      </ThemeProvider>
    </Box>
  );
};

export default Router;
