import { Paper, Typography, Container, Alert, Stack } from '@mui/material';
import { FullScreenMessage } from '../components/general/FullScreenMessage';
import { SingleSelector } from '../components/input/common/SingleSelector';
import useRoomApi from '../hooks/useRoomsApi';
import { Time, times } from '../types/filter/Time';
import { WeekdayExcludeConcentrated, weekdays } from '../types/filter/Weekday';
import { useMemo, useState } from 'react';
import { SemesterSpringAndFall, semestersSpringAndFall } from '../types/filter/Semester';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import useGA4PageEvent from '../hooks/useGA4PageEvent';
import { getSemester } from '../lib/main';
import ApartmentIcon from '@mui/icons-material/Apartment';

export const RoomsByTimePage = () => {
  const { roomApi } = useRoomApi();
  useGA4PageEvent();

  const [inputState, setInputState] = useState<{
    building?: string | undefined;
    weekday?: WeekdayExcludeConcentrated | undefined;
    time?: Time | undefined;
    semester?: SemesterSpringAndFall | undefined;
  }>({ semester: getSemester(new Date()) });

  const options = getSearchOptions(inputState);
  const availableRooms = useMemo(() => {
    if (!options || !roomApi) return undefined;
    return roomApi.getAvailableRooms(options);
  }, [roomApi, options]);

  // 読み込み中
  if (!roomApi) return <FullScreenMessage progress />;
  const buildings = roomApi.getBuildings();
  const buildingOptions = buildings.map((building) => ({
    value: building,
    label: building,
    icon: <ApartmentIcon color="primary" />
  }));

  return (
    <PageWrapper bgColored>
      <Header pageTitle="空き教室検索" showBackButton />
      <Container maxWidth="xl">
        <Paper sx={{ p: 2, my: 2 }} variant="outlined">
          <Stack gap={1}>
            <SingleSelector
              options={semestersSpringAndFall}
              label="開講時期"
              selectedValue={inputState.semester}
              onChange={(v) => {
                setInputState((s) => ({ ...s, semester: v }));
              }}
              type={'button'}
            />
            <SingleSelector
              options={buildingOptions}
              label="建物を選択"
              selectedValue={inputState.building}
              onChange={(v) => {
                setInputState((s) => ({ ...s, building: v }));
              }}
              type={'button'}
            />
            <SingleSelector
              options={weekdays}
              label="曜日"
              selectedValue={inputState.weekday}
              onChange={(v) => {
                setInputState((s) => ({ ...s, weekday: v }));
              }}
              type={'button'}
            />
            <SingleSelector
              options={times}
              label="時限"
              selectedValue={inputState.time}
              onChange={(v) => {
                setInputState((s) => ({ ...s, time: v }));
              }}
              type={'button'}
            />
          </Stack>
        </Paper>
        <Paper sx={{ p: 2 }} variant="outlined">
          {!availableRooms && <Typography align="center">条件を選択してください</Typography>}
          {availableRooms && (
            <Typography variant="h6" gutterBottom>
              {availableRooms && availableRooms.length}件の空き教室が見つかりました
            </Typography>
          )}
          <Alert severity="warning" sx={{ my: 1 }}>
            空き教室の利用ルールについては各学務係等の指示に従ってください。
          </Alert>
          {availableRooms &&
            availableRooms.map((item, index) => (
              <Typography key={index} gutterBottom>
                {item.name}
              </Typography>
            ))}
        </Paper>
      </Container>
      <MobileNavigation />
    </PageWrapper>
  );
};

const getSearchOptions = (inputState: {
  building?: string | undefined;
  weekday?: WeekdayExcludeConcentrated | undefined;
  time?: Time | undefined;
  semester?: SemesterSpringAndFall | undefined;
}) => {
  if (inputState.building && inputState.weekday && inputState.time && inputState.semester) {
    const building = inputState.building;
    const weekday = inputState.weekday;
    const time = inputState.time;
    return { building, weekday, time, semester: inputState.semester };
  }
  return undefined;
};
