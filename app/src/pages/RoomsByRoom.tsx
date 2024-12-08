import { Container, Paper, Typography, Box, Grid, styled } from '@mui/material';
import { useState, useMemo } from 'react';
import PageWrapper from '../components/general/BackgroundWrapper';
import { FullScreenMessage } from '../components/general/FullScreenMessage';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import { SingleSelector } from '../components/input/common/SingleSelector';
import useGA4PageEvent from '../hooks/useGA4PageEvent';
import useRoomApi from '../hooks/useRoomsApi';
import { SemesterSpringAndFall, semesterValueToLabel } from '../types/filter/Semester';
import { getSemester } from '../lib/main';
import { grey, blue } from '@mui/material/colors';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';

export const RoomsByRoomPage = () => {
  const { roomApi } = useRoomApi();
  useGA4PageEvent();
  const [inputState, setInputState] = useState<{
    building?: string | undefined;
    name?: string | undefined;
    semester: SemesterSpringAndFall;
  }>({ semester: getSemester(new Date()) });
  const options = getSearchOptions(inputState);

  const selectedRoom = useMemo(() => {
    if (!options || !roomApi) return undefined;
    return roomApi.getRoom(options);
  }, [roomApi, options]);

  // 読み込み中
  if (!roomApi) return <FullScreenMessage progress />;
  const headerText = ['月', '火', '水', '木', '金'];

  const rooms = roomApi.getRooms({ building: inputState.building });
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
        <SingleSelector
          options={buildingOptions}
          label="建物を選択"
          selectedValue={inputState.building}
          onChange={(v) => {
            setInputState((s) => ({ ...s, building: v }));
          }}
          type={'card'}
          sx={{ my: 2 }}
        />
        <Paper sx={{ p: 2, my: 2 }} variant="outlined">
          <SingleSelector
            options={rooms.map((room) => ({
              value: `${room.name}`,
              label: `${room.name}`
            }))}
            noneOptionLabel="教室・施設を選択"
            label="教室・施設を選択"
            selectedValue={inputState.name}
            onChange={(v) => {
              setInputState((s) => ({ ...s, name: v }));
            }}
            type={'dropdown'}
          />
        </Paper>
        <Paper sx={{ p: 2 }} variant="outlined">
          <Box>
            {selectedRoom && (
              <>
                <Typography variant="h6">
                  {inputState.building} {inputState.name} {semesterValueToLabel(inputState.semester)}の使用予定
                </Typography>
                <Typography variant="body2" my={1}>
                  講義なし表示でも集中講義や講義以外の使用等で空いていない場合があります。空き教室の利用ルールについては各学務係等の指示に従ってください。
                </Typography>
                <Grid container spacing={1}>
                  {headerText.map((item) => (
                    <Grid item xs={2.4} key={item}>
                      <CellElement>
                        <Typography align="center" variant="body2">
                          {item}
                        </Typography>
                      </CellElement>
                    </Grid>
                  ))}
                  {selectedRoom?.getScheduleArray(inputState.semester).map((item, index) => (
                    <Grid item xs={2.4} key={index}>
                      <Box sx={{ height: 60 }}>
                        {item ? (
                          <CellElement sx={{ bgcolor: grey[200] }}>
                            <CloseOutlinedIcon />
                            <Typography align="center" variant="body2">
                              <span style={{ display: 'inline-block' }}>講義</span>
                              <span style={{ display: 'inline-block' }}>あり</span>
                            </Typography>
                            {item}
                          </CellElement>
                        ) : (
                          <CellElement sx={{ bgcolor: blue[100] }}>
                            <CircleOutlinedIcon />
                            <Typography align="center" variant="body2">
                              講義なし
                            </Typography>
                          </CellElement>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
            {!selectedRoom && <Box>教室・施設を選択してください</Box>}
          </Box>
        </Paper>
      </Container>
      <MobileNavigation />
    </PageWrapper>
  );
};

const getSearchOptions = (inputState: {
  building?: string | undefined;
  name?: string | undefined;
  semester: SemesterSpringAndFall;
}) => {
  if (inputState.building && inputState.name) {
    const building = inputState.building;
    const name = inputState.name;
    return { building, name, semester: inputState.semester };
  }
  return undefined;
};

const CellElement = styled(Box)(({ style }) => ({
  ...style,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  borderRadius: 5,
  fontSize: 10,
  alignItems: 'center',
  justifyContent: 'center'
}));
