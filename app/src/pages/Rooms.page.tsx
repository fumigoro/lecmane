import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import { RoomSearchModeSelect } from '../components/room/RoomSearchModeSelect';
import useGA4PageEvent from '../hooks/useGA4PageEvent';
import { RoomSearchMethod } from '../types/global';
import { useNavigate } from 'react-router-dom';

const RoomsPage = () => {
  useGA4PageEvent();
  const [method, setMethod] = useState<RoomSearchMethod | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    if (!method) return;
    navigate(`${method}`);
  }, [method, navigate]);

  return (
    <PageWrapper bgColored>
      <Header pageTitle="空き教室検索" showBackButton />
      <Container maxWidth="xl">
        <RoomSearchModeSelect setMethod={setMethod} />
      </Container>
      <MobileNavigation />
    </PageWrapper>
  );
};

export default RoomsPage;
