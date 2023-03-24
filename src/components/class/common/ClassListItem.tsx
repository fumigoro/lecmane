import { Box, Checkbox, Divider, Stack, Typography } from '@mui/material';
import { Class } from '../../../types/global';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import NumbersIcon from '@mui/icons-material/Numbers';
import { ClassOpeMenu } from './ClassOpeMenu';
import { classApi } from '../../../classes.api';
import { primaryColor } from '../../../styles/theme';

type Props = {
  classItem: Class;
};

export const ClassListItem = ({ classItem }: Props) => {
  const [isFavorite, setIsFavorite] = useState(classApi.isFavorite(classItem.year, classItem.id));
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ py: 1, px: 2, background: isFavorite ? primaryColor[50] : '' }}>
        <Typography variant="h6" component="div" gutterBottom onClick={(e) => setOpen(true)}>
          {classItem.title}
        </Typography>
        <Stack direction="row">
          <Box sx={{ width: '100%', cursor: 'pointer' }} onClick={(e) => setOpen(true)}>
            <Typography variant="body2">
              {[classItem.department, classItem.category, classItem.field].join(' / ')}
            </Typography>
            <Stack direction="row" alignItems={'center'} spacing={1} sx={{ my: 1 }}>
              <Stack direction="row" spacing={0.3}>
                <CalendarTodayIcon sx={{ color: 'gray', fontSize: 16 }} />
                <Typography variant="body2">
                  {classItem.grade}年 {classItem.semester.replace('学', '')}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.3}>
                <AccessTimeFilledIcon sx={{ color: 'gray', fontSize: 16 }} />
                <Typography variant="body2">
                  {classItem.weekday.replace('日', '')} {classItem.time.replace('時', '')}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.3}>
                <NumbersIcon sx={{ color: 'gray', fontSize: 16 }} />
                <Typography variant="body2" color="gray">
                  {classItem.id}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
              <Stack direction="row" spacing={0.3}>
                <SchoolIcon sx={{ color: 'gray', fontSize: 16 }} />
                <Typography variant="body2">
                  {classItem.teachers[0]}
                  {classItem.teachers.length > 2 && ' ほか'}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Stack sx={{ width: 50 }} justifyContent="end">
            <Stack>
              <Checkbox
                icon={<StarBorderIcon color="primary" />}
                checkedIcon={<StarIcon />}
                checked={isFavorite}
                onChange={(e) => {
                  setIsFavorite(e.target.checked);
                  if (e.target.checked) {
                    classApi.addFavorite(classItem.year, classItem.id);
                  } else {
                    classApi.removeFavorite(classItem.year, classItem.id);
                  }
                }}
                sx={{ p: 0 }}
              />
              <Typography sx={{ fontSize: 12, textAlign: 'center' }} color="primary">
                {isFavorite ? '登録済' : '登録'}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <ClassOpeMenu classItem={classItem} open={open} setOpen={setOpen} />
      <Divider />
    </>
  );
};
