import { Paper, Stack, Typography } from '@mui/material';
import { getCategoryColor, shortRoomName } from '../../lib/main';
import { Class } from '../../types/global';
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
  const color = getCategoryColor(c.department);

  return (
    <>
      <Paper
        sx={{ background: color[50], height: '100%', cursor: 'pointer' }}
        elevation={0}
        onClick={() => setOpen(true)}
      >
        <Stack justifyContent="space-between" sx={{ height: '100%' }}>
          <Typography
            sx={{
              px: 0.5,
              py: 0.2,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '2'
            }}
            align="center"
            variant="body2"
          >
            {c.title}
          </Typography>
          <Paper sx={{ background: color[400], px: 0.5, py: 0.2 }} elevation={0}>
            <Typography
              sx={{
                color: 'white',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: '2'
              }}
              align="center"
              variant="body2"
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
