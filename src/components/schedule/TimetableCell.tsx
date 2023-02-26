import { Paper, Stack, Typography } from '@mui/material';
import { shortRoomName } from '../../lib/main';
import { Class } from '../../types/global';
import { mainTheme } from '../../styles/theme';
import { ClassOpeMenu } from '../class/common/ClassOpeMenu';
import { useState } from 'react';
type Props = {
  classes: Class[];
};
export const TimetableCell = ({ classes }: Props) => {
  if (classes.length < 1) {
    return <TimetableCellBase />;
  }
  return (
    <TimetableCellBase>
      <Stack spacing={0.2} sx={{ height: '100%' }}>
        {classes.map((c, index) => (
          <TimetableClassItem key={`${c.id}-${index}`} classItem={c} />
        ))}
      </Stack>
    </TimetableCellBase>
  );
};

type TimetableClassItemProps = {
  classItem: Class;
};
export const TimetableClassItem = ({ classItem: c }: TimetableClassItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Paper
        sx={{ background: mainTheme.palette.primary.light, height: '100%', cursor: 'pointer' }}
        elevation={0}
        onClick={() => setOpen(true)}
      >
        <Stack justifyContent="space-between" sx={{ height: '100%' }}>
          <Typography
            sx={{
              px: 0.5,
              py: 0.2,
              fontSize: 4,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '2'
            }}
            align="center"
          >
            {c.title}
          </Typography>
          <Paper sx={{ background: mainTheme.palette.primary.main, px: 0.5, py: 0.2 }} elevation={0}>
            <Typography
              sx={{
                fontSize: 4,
                color: 'white',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: '2'
              }}
              align="center"
            >
              {shortRoomName(c.room)}
            </Typography>
          </Paper>
        </Stack>
      </Paper>
      <ClassOpeMenu classItem={c} open={open} setOpen={setOpen} />
    </>
  );
};

type TimetableCellBaseProps = {
  children?: JSX.Element;
};
export const TimetableCellBase = ({ children }: TimetableCellBaseProps) => {
  return (
    <Stack sx={{ alignItems: 'stretch', height: '100%' }}>
      <Paper sx={{ height: '100%' }} elevation={0}>
        {children}
      </Paper>
    </Stack>
  );
};
