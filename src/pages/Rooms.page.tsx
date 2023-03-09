import { Container } from '@mui/material';
import { useState } from 'react';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import { SingleSelector } from '../components/input/common/SingleSelector';
import { RoomSearchModeSelect } from '../components/room/RoomSearchModeSelect';
import { buildings } from '../types/Building';
import { RoomSearchMethod } from '../types/global';

const RoomsPage = () => {
  const [method, setMethod] = useState<RoomSearchMethod | undefined>(undefined);
  return (
    <PageWrapper bgColored>
      <Header pageTitle="空き教室検索" />
      <Container maxWidth="xl">
        {!method && <RoomSearchModeSelect setMethod={setMethod} />}
        <SingleSelector
          options={buildings}
          label='建物を選択'
          selectedValue={undefined}
          onChange={() => { }}
          type={'card'}
          sx={{ my: 4 }}
        />
      </Container>
      <MobileNavigation page="home" />
    </PageWrapper>
  );
};

export default RoomsPage;
