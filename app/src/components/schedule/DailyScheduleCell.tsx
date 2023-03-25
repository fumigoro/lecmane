import { Box, Stack, SxProps, Typography } from '@mui/material';
import { lightBlue, green, pink } from '@mui/material/colors';
import { shortRoomName } from '../../lib/main';
import { Time } from '../../types/filter/Time';
import { Class } from '../../types/global';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ClassOpeMenu } from '../class/common/ClassOpeMenu';
import { useState } from 'react';

const tone = 'A400';
const colors = [lightBlue, lightBlue, pink, pink, pink, green, green].map((c) => c[tone]);
const classInfoList = [
  {
    start: '8:45',
    end: '10:15',
    title: '1'
  },
  {
    start: '10:30',
    end: '12:00',
    title: '2'
  },
  {
    start: '13:00',
    end: '14:30',
    title: '3'
  },
  {
    start: '14:45',
    end: '16:15',
    title: '4'
  },
  {
    start: '16:30',
    end: '18:00',
    title: '5'
  },
  {
    start: '18:10',
    end: '19:40',
    title: '6'
  },
  {
    start: '19:50',
    end: '21:20',
    title: '7'
  }
];

type Props = {
  classes: Class[];
  time: Time;
};

export const DailyScheduleCell = ({ time, classes }: Props) => {
  // 各コマの開始時間と終了時間
  const classInfo = classInfoList[time - 1];
  const color = colors[time - 1];
  const [open, setOpen] = useState(false);

  return (
    <Stack sx={{ my: 2 }} direction="row" spacing={2}>
      <Stack alignItems="center" spacing={1}>
        <Typography variant="h3">{classInfo.title}</Typography>
        <Box sx={{ background: color, width: '3px', borderRadius: '3px' }} flexGrow={1} />
      </Stack>
      <Box sx={{ width: '100%' }}>
        <TimeDivider text={classInfo.start} />
        <Box my={1}>
          {classes.map((c) => (
            <div key={c.id}>
              <Box my={1} onClick={(e) => setOpen(true)}>
                <Typography sx={{ fontWeight: 'bold' }}>{c.title}</Typography>
                <Stack direction="row" alignItems="flex-end" my={0.5}>
                  <LocationOnIcon sx={{ color: 'gray' }} />
                  <Typography>{shortRoomName(c.room)}</Typography>
                </Stack>
              </Box>
              <ClassOpeMenu classItem={c} open={open} setOpen={setOpen} />
            </div>
          ))}
        </Box>
        <TimeDivider text={classInfo.end} />
      </Box>
    </Stack>
  );
};

const TimeDivider = ({ text, sx }: { text: string; sx?: SxProps }) => (
  <Stack direction="row" alignItems="center" spacing={2} sx={{ ...sx }}>
    <Typography color="gray">{text}</Typography>
    <Box sx={{ background: '#f0f0f0', height: '2px' }} flexGrow={1} />
  </Stack>
);
