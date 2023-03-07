import { Box, Typography, Stack } from '@mui/material';
import { Class, FullClass } from '../../../types/global';
import NumbersIcon from '@mui/icons-material/Numbers';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import { useEffect, useState } from 'react';
import { ClassOpeMenu } from './ClassOpeMenu';
import { classApi } from '../../../classes.api';

type Props = {
  classItem: Class;
};

/**
 * 教科書リストページ用、教科書リストが表示されるタイプの講義情報コンポーネント
 * @param param0
 * @returns
 */
export const ClassItemWithTextbooks = ({ classItem }: Props) => {
  const [open, setOpen] = useState(false);

  const [fullData, setFullData] = useState<undefined | FullClass>(undefined);
  useEffect(() => {
    classApi.getSyllabus(classItem.year, classItem.id).then((fc) => {
      if (fc) {
        setFullData(fc);
      }
    });
  }, [classItem]);

  return (
    <Box sx={{ py: 1 }}>
      <Typography variant="h6" component="div" gutterBottom onClick={(e) => setOpen(true)}>
        {classItem.title}
      </Typography>
      <Box sx={{ width: '100%', cursor: 'pointer' }} onClick={(e) => setOpen(true)}>
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
            <SchoolIcon sx={{ color: 'gray', fontSize: 16 }} />
            <Typography variant="body2">
              {classItem.teachers[0]}
              {classItem.teachers.length > 2 && ' ほか'}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.3}>
            <NumbersIcon sx={{ color: 'gray', fontSize: 16 }} />
            <Typography variant="body2" color="gray">
              {classItem.id}
            </Typography>
          </Stack>
        </Stack>
        <Typography>{fullData?.details.goals}</Typography>
      </Box>
      <ClassOpeMenu classItem={classItem} open={open} setOpen={setOpen} />
    </Box>
  );
};
