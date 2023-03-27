import { Container, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import { SingleSelector } from '../components/input/common/SingleSelector';
import { RoomSearchModeSelect } from '../components/room/RoomSearchModeSelect';
import useGA4PageEvent from '../hooks/useGA4PageEvent';
import { Room, roomApi } from '../rooms.api';
import { buildings } from '../types/Building';
import { SEMESTER, Semester } from '../types/filter/Semester';
import { Time, times } from '../types/filter/Time';
import { Weekday, weekdays } from '../types/filter/Weekday';
import { RoomSearchMethod } from '../types/global';

const RoomsPage = () => {
  useGA4PageEvent();
  const [method, setMethod] = useState<RoomSearchMethod | undefined>(undefined);
  const [rooms, setRooms] = useState<Room[]>([]);

  const [inputState, setInputState] = useState<{
    building?: string | undefined;
    weekday?: Weekday | undefined;
    time?: Time | undefined;
    semester: Semester;
  }>({ semester: SEMESTER.SPRING });

  const availableRooms = useMemo(() => {
    if (!inputState.building || !inputState.weekday || !inputState.time) {
      return [];
    }
    const condition = {
      semester: inputState.semester,
      weekday: inputState.weekday,
      time: inputState.time
    };
    return rooms.filter(
      (room) => room.search && room.schedule && room.building === inputState.building && room.isAvailable(condition)
    );
  }, [inputState, rooms]);

  useEffect(() => {
    roomApi.initialize().then(() => {
      setRooms(roomApi.getData());
    });
  }, []);

  return (
    <PageWrapper bgColored>
      <Header pageTitle="空き教室検索" showBackButton />
      <Container maxWidth="xl">
        {!method && <RoomSearchModeSelect setMethod={setMethod} />}
        {method === 'time' && (
          <>
            <SingleSelector
              options={buildings}
              label="建物を選択"
              selectedValue={inputState.building}
              onChange={(v) => {
                setInputState((s) => ({ ...s, building: v }));
              }}
              type={'card'}
              sx={{ my: 4 }}
            />
            <Paper sx={{ p: 2 }}>
              <SingleSelector
                options={weekdays}
                label="曜日を選択"
                selectedValue={inputState.weekday}
                onChange={(v) => {
                  setInputState((s) => ({ ...s, weekday: v }));
                }}
                type={'button'}
              />
              <SingleSelector
                options={times}
                label="時限を選択"
                selectedValue={inputState.time}
                onChange={(v) => {
                  setInputState((s) => ({ ...s, time: v }));
                }}
                type={'button'}
              />
            </Paper>
            <Paper>
              {availableRooms.map((item, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemButton>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
                // <Typography key={index}>{item.name}</Typography>
              ))}
            </Paper>
          </>
        )}
      </Container>
      <MobileNavigation page="home" />
    </PageWrapper>
  );
};

export default RoomsPage;
