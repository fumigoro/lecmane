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
import SettingPage from './pages/Setting.page';
import TermsPage from './pages/Terms.page';
import TextbookPage from './pages/Textbook.page';
import { mainTheme } from './styles/theme';
import { StorageIO, Key } from './lib/storage';
import { useEffect, useState } from 'react';
import { WalkThrough } from './components/general/WalkThrough';
import Migration from './pages/Migration.page';
import CreditSummaryPage from './pages/CreditTotal.page';
import liff from '@line/liff/dist/lib';
import ReactGA from 'react-ga4';
import { RoomsByTimePage } from './pages/RoomsByTime';
import { RoomsByRoomPage } from './pages/RoomsByRoom';

const Router = () => {
  // ローカルストレージからデータ読み込み
  const [setUpCompleted, setSetUpCompleted] = useState<Boolean>(StorageIO.get(Key.SETUP_DONE) === 'true');

  const initLiff = async () => {
    await liff.init({ liffId: import.meta.env.VITE_LIFF_ID || '' });
    if (!liff.isLoggedIn()) {
      liff.login();
    } else {
      // const profile = await liff.getProfile();
    }
  };

  useEffect(() => {
    if (setUpCompleted) {
      StorageIO.set(Key.SETUP_DONE, 'true');
      // LIFF を初期化
      initLiff();
      // Google Analytics を初期化
      ReactGA.initialize('G-ND9S98LEFF');
    }
  }, [setUpCompleted]);

  return (
    <Box sx={{ background: { xs: '#fafafa', md: '#fff' }, fontFamily: 'Noto Sans JP' }}>
      <Migration />
      <ThemeProvider theme={mainTheme}>
        <Routes>
          {/* 初回のみウォークスルーを表示 */}
          {!setUpCompleted && <Route path="/" element={<WalkThrough startApp={() => setSetUpCompleted(true)} />} />}
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/setting" element={<SettingPage />} />

          <Route path="/terms" element={<TermsPage />} />
          <Route path="/profile" element={<Mypage />} />
          <Route path="/classes/:id" element={<ClassDetailPage />} />
          <Route path="/features/credits" element={<CreditSummaryPage />} />
          <Route path="/features/textbook" element={<TextbookPage />} />
          <Route path="/features/favorite" element={<FavoritePage />} />
          <Route path="/features/rooms" element={<RoomsPage />} />
          <Route path="/features/rooms/time" element={<RoomsByTimePage />} />
          <Route path="/features/rooms/room" element={<RoomsByRoomPage />} />
        </Routes>
      </ThemeProvider>
    </Box>
  );
};

export default Router;
